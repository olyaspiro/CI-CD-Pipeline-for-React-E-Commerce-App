import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* BackButton removed */}

      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(item => (
              <li
                key={item.id}
                style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 80, height: 80, objectFit: 'contain', marginRight: '1rem' }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div>
                    Quantity:
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                      style={{ width: '50px', marginLeft: '0.5rem' }}
                    />
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)} style={{ cursor: 'pointer' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div>
            <p>
              <strong>Total Items:</strong> {totalCount}
            </p>
            <p>
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
