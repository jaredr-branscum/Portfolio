import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    import.meta.env.VITE_CONTACT_EMAIL = 'test-email@example.com';
    import.meta.env.VITE_CONTACT_ENDPOINT = 'https://mock-endpoint.com/ajax/test-email@example.com';
  });

  test('displays validation errors on empty submission', () => {
    render(<Contact />);
    
    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByTestId('error-name')).toHaveTextContent('Name is required');
    expect(screen.getByTestId('error-email')).toHaveTextContent('Email is required');
    expect(screen.getByTestId('error-message')).toHaveTextContent('Message is required');
  });

  test('displays validation error for invalid email', async () => {
    render(<Contact />);

    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByTestId('form-input-email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId('form-input-message'), { target: { value: 'This is a long message to pass validation.' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-email')).toHaveTextContent('Please enter a valid email address');
    });
    expect(screen.queryByTestId('error-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  test('submits successfully and clears fields when API returns 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);

    const nameInput = screen.getByTestId('form-input-name');
    const emailInput = screen.getByTestId('form-input-email');
    const messageInput = screen.getByTestId('form-input-message');
    const subjectInput = screen.getByTestId('form-input-subject');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Project Collaboration' } });
    fireEvent.change(messageInput, { target: { value: 'Hello! I would love to collaborate on a new project.' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(/sending.../i);

    await waitFor(() => {
      expect(screen.getByTestId('form-status-success')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://mock-endpoint.com/ajax/test-email@example.com',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'Project Collaboration',
          message: 'Hello! I would love to collaborate on a new project.',
        }),
      })
    );

    // Verify fields are cleared
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  test('handles server error states gracefully', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    render(<Contact />);

    fireEvent.change(screen.getByTestId('form-input-name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByTestId('form-input-email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByTestId('form-input-message'), { target: { value: 'This is a long message to pass validation.' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    expect(screen.queryByTestId('form-status-success')).not.toBeInTheDocument();
  });
});
