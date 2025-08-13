import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

interface Props {
  product: Product;
}

const placeholderImage = '/placeholder.png'; // Place in public folder

const ProductCard: React.FC<Props> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={product.image || placeholderImage}
        alt={product.title}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.includes('placeholder.png')) {
            target.src = placeholderImage;
          }
        }}
        style={{ width: '100%', height: 200, objectFit: 'contain' }}
      />
      <h3>{product.title}</h3>
      <p>
        <strong>${product.price.toFixed(2)}</strong>
      </p>
      <p>
        <em>Category: {product.category}</em>
      </p>
      <button
        onClick={() => setShowDescription((prev) => !prev)}
        style={{ marginBottom: '0.5rem' }}
      >
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>
      {showDescription && <p>{product.description}</p>}
      <p>
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
