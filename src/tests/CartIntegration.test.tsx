import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart'; 
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { MemoryRouter } from 'react-router-dom';  

const product = {
  id: 1,
  title: 'Integration Test Product',
  price: 19.99,
  category: 'test',
  description: 'Integration description',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.2, count: 5 },
};

describe('Cart integration test', () => {
  test('adds product to cart and updates cart UI', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    const addToCartBtn = screen.getByRole('button', { name: /Add to Cart/i });
    await userEvent.click(addToCartBtn);

    // Confirm product title in ProductCard - immediate
    expect(screen.getByRole('heading', { level: 3, name: /Integration Test Product/i })).toBeInTheDocument();

    // Debug current DOM (optional)
    // screen.debug();

    // Wait for Cart to update and show the product title inside <h4>
    const cartTitle = await screen.findByRole('heading', { level: 4, name: /Integration Test Product/i });
    expect(cartTitle).toBeInTheDocument();

    // Wait for Cart to show product price exactly as rendered
    expect(await screen.findByText('Price: $19.99')).toBeInTheDocument();

    // Optionally check quantity input exists and value is 1
    const quantityInput = screen.getByDisplayValue('1');
    expect(quantityInput).toBeInTheDocument();
  });
});
