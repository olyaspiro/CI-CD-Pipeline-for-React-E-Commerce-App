// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
    >
      ← Back
    </button>
  );
};

export default BackButton;
