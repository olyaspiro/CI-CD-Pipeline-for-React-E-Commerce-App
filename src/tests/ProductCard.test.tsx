import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { useDispatch } from 'react-redux';

// Mock Redux dispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

describe('ProductCard', () => {
  const mockDispatch = jest.fn();
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    category: 'electronics',
    description: 'This is a test description.',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.5, count: 20 },
  };

  beforeEach(() => {
    ((useDispatch as unknown) as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('renders product details', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
  });

  it('toggles product description visibility', () => {
    render(<ProductCard product={mockProduct} />);
    const toggleBtn = screen.getByText(/Show Description/i);
    
    // Show description
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
    
    // Hide description
    fireEvent.click(screen.getByText(/Hide Description/i));
    expect(screen.queryByText(/This is a test description/i)).not.toBeInTheDocument();
  });

  it('dispatches addToCart when Add to Cart is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: {
        id: 1,
        title: 'Test Product',
        price: 19.99,
        image: 'https://via.placeholder.com/150',
      },
    });
  });
});

