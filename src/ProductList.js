import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ProductList.css"
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);
  

  return (
    <div className='product-list-container'>

      <h2 className="product-list-title">Product List</h2>
      <Link to="/add-product" className="add-product-link">Add New Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
