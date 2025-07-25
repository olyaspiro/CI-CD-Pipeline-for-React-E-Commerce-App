import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import ErrorBoundary from './components/ErrorBoundary';
import Cart from './components/Cart'; // 🛒 Import Cart component

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <Router>
      <ErrorBoundary>
        <div style={{ padding: '1rem' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>🛍️ My E-Commerce Store</h1>
            <Link to="/cart">🛒 Cart</Link>
          </header>

          <hr />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CategoryFilter onCategoryChange={setSelectedCategory} />
                  <hr />
                  <ProductList selectedCategory={selectedCategory} />
                </>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;



