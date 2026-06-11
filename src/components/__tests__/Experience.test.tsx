import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Experience } from '../Experience';

describe('Experience Component', () => {
  test('renders all position headers', () => {
    render(<Experience />);
    
    expect(screen.getByText('Self Employed')).toBeInTheDocument();
    expect(screen.getByText('Veracode')).toBeInTheDocument();
    expect(screen.getByText('NCR Corporation')).toBeInTheDocument();
  });

  test('collapses and expands timeline items on click', () => {
    render(<Experience />);
    
    // By default, Self Employed (selfemployed) is expanded
    const selfCard = screen.getByTestId('experience-card-selfemployed');
    const selfDetails = screen.getByTestId('experience-details-selfemployed');
    expect(selfCard).toHaveAttribute('aria-expanded', 'true');
    expect(selfDetails).toHaveClass('expanded');

    // By default, Engineer I (ncr) is collapsed
    const ncrCard = screen.getByTestId('experience-card-ncr');
    const ncrDetails = screen.getByTestId('experience-details-ncr');
    expect(ncrCard).toHaveAttribute('aria-expanded', 'false');
    expect(ncrDetails).not.toHaveClass('expanded');

    // Click ncr card -> should expand ncr and collapse selfemployed
    fireEvent.click(ncrCard);
    expect(ncrCard).toHaveAttribute('aria-expanded', 'true');
    expect(ncrDetails).toHaveClass('expanded');
    expect(selfCard).toHaveAttribute('aria-expanded', 'false');
    expect(selfDetails).not.toHaveClass('expanded');

    // Click ncr card again -> should collapse ncr (none expanded)
    fireEvent.click(ncrCard);
    expect(ncrCard).toHaveAttribute('aria-expanded', 'false');
    expect(ncrDetails).not.toHaveClass('expanded');
  });
});
