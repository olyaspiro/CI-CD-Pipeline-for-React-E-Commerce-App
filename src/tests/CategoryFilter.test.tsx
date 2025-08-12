import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';
import { useQuery } from '@tanstack/react-query';

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('CategoryFilter', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<CategoryFilter onCategoryChange={mockOnChange} />);
    expect(screen.getByText(/Loading categories.../i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<CategoryFilter onCategoryChange={mockOnChange} />);
    expect(screen.getByText(/Error loading categories./i)).toBeInTheDocument();
  });

  it('renders categories and calls onCategoryChange', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: ['electronics', 'jewelery'],
      isLoading: false,
      isError: false,
    });

    render(<CategoryFilter onCategoryChange={mockOnChange} />);

    // Options appear
    expect(screen.getByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Jewelery' })).toBeInTheDocument();

    // Simulate user selection
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'electronics' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('electronics');
  });
});
