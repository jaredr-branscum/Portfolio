import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from '../Projects';

describe('Projects Component', () => {
  test('renders all projects initially', () => {
    render(<Projects />);
    
    // Check titles of all projects are present
    expect(screen.getByText('MistyChat')).toBeInTheDocument();
    expect(screen.getByText('Deep Catan Analysis')).toBeInTheDocument();
  });

  test('filters projects by public category', () => {
    render(<Projects />);
    
    const publicBtn = screen.getByTestId('filter-btn-public');
    fireEvent.click(publicBtn);

    // Public projects should be visible
    expect(screen.getByText('MistyChat')).toBeInTheDocument();

    // Private projects should not be visible
    expect(screen.queryByText('Deep Catan Analysis')).not.toBeInTheDocument();
  });

  test('filters projects by private category', () => {
    render(<Projects />);
    
    const privateBtn = screen.getByTestId('filter-btn-private');
    fireEvent.click(privateBtn);

    // Private projects should be visible
    expect(screen.getByText('Deep Catan Analysis')).toBeInTheDocument();

    // Public projects should not be visible
    expect(screen.queryByText('MistyChat')).not.toBeInTheDocument();
  });

  test('renders external links for public projects and badge for private projects', () => {
    render(<Projects />);
    
    // MistyChat is public: should have GitHub and Live Demo links
    const gitLink = screen.getByTestId('github-link-mistychat');
    const liveLink = screen.getByTestId('live-link-mistychat');
    expect(gitLink).toBeInTheDocument();
    expect(liveLink).toBeInTheDocument();
    expect(gitLink).toHaveAttribute('href', 'https://github.com/jaredr-branscum/MistyChat');
    expect(liveLink).toHaveAttribute('href', 'https://jaredr-branscum.github.io/MistyChat/');

    // Deep Catan Analysis is private: should have lock badge and no links
    expect(screen.getByTestId('private-badge-deepcatananalysis')).toBeInTheDocument();
    expect(screen.queryByTestId('github-link-deepcatananalysis')).not.toBeInTheDocument();
    expect(screen.queryByTestId('live-link-deepcatananalysis')).not.toBeInTheDocument();
  });
});
