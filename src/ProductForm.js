import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProductForm.css"

function ProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    releaseDate: '',
    category: '',
    productAvailable: false,
    stockQuantity: '',
    imageFile: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/api/product/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('There was an error!', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setProduct(prevState => ({
      ...prevState,
      imageFile: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Create a product object excluding the imageFile
    const productData = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      releaseDate: product.releaseDate,
      category: product.category,
      productAvailable: product.productAvailable,
      stockQuantity: product.stockQuantity
    };
  
    // Append the product part as a JSON string
    formData.append('product', JSON.stringify(productData));
  
    // Append the image file if it exists
    if (product.imageFile) {
      formData.append('imageFile', product.imageFile);
    }
  
    const request = id
      ? axios.put(`/api/product/${id}`, formData)
      : axios.post('/api/product', formData);
  
    request.then(() => navigate('/'))
      .catch(error => console.error('There was an error!', error));
  };
  

  return (
    <>
    <div className='product-form-container'>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input type="date" name="releaseDate" value={product.releaseDate} onChange={handleChange} placeholder="Release Date" required />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
     

      <div className="checkbox-container">
      <input
        type="checkbox"
        name="productAvailable"
        checked={product.productAvailable}
        onChange={handleChange}
        id="productAvailable"
      />
      <label htmlFor="productAvailable">Available</label>
    </div>
      <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} placeholder="Stock Quantity" required />
      <input type="file" name="imageFile" onChange={handleFileChange} />
      <button type="submit">{id ? "Update" : "Add"} Product</button>
    </form>
    </div>
    </>
  );
}

export default ProductForm;
