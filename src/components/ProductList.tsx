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
  rating: { rate: number; count: number };
}

interface Props {
  selectedCategory: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const url = 'https://fakestoreapi.com/products';
  const res = await axios.get<Product[]>(url);
  return res.data;
};

const ProductList: React.FC<Props> = ({ selectedCategory }) => {
  const { data: products = [], isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(),
  });


  const filteredProducts = ()=> {
    if (!selectedCategory || selectedCategory === 'All Categories') {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }
  const items = filteredProducts();
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >

      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
