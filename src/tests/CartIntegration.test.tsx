
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

    // ProductCard title is inside an h3 heading
    expect(screen.getByRole('heading', { level: 3, name: /Integration Test Product/i })).toBeInTheDocument();

    // Cart item title is inside an h4 heading
    expect(screen.getByRole('heading', { level: 4, name: /Integration Test Product/i })).toBeInTheDocument();

    // Price inside cart
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
