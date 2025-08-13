import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Props {
  selectedCategory: string;
}

const fetchProducts = async (category: string) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
    : `https://fakestoreapi.com/products`;
  const res = await axios.get<Product[]>(url);
  return res.data;
};

const ProductList: React.FC<Props> = ({ selectedCategory }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
