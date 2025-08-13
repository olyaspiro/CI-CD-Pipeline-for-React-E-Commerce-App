import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  onCategoryChange: (category: string) => void;
}

const fetchCategories = async () => {
  const res = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
  return res.data;
};

const CategoryFilter: React.FC<Props> = ({ onCategoryChange }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <select onChange={(e) => onCategoryChange(e.target.value)} defaultValue="">
      <option value="">All Categories</option>
      {data?.map((cat) => {
        const displayName = cat.charAt(0).toUpperCase() + cat.slice(1); // Capitalize
        return (
          <option key={cat} value={cat}>
            {displayName}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryFilter;
