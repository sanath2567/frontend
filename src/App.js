import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import ProductForm from './ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
