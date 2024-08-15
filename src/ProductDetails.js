// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     axios.get(`/api/product/${id}`)
//       .then(response => {setProduct(response.data)
//         return axios.get(`/api/product/${id}/image`, { responseType: 'longblob' });
//       })
//       .then(response => {
//         // Create a URL for the image blob
//         const imageUrl = URL.createObjectURL(response.data);
//         setImageUrl(imageUrl);
//       })
//       .catch(error => console.error('There was an error!', error));
//   }, [id]);
  
  

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>{product.brand}</p>
//       <p>{product.price}</p>
//       <p>{product.releaseDate}</p>
//       <p>{product.category}</p>
//       <p>{product.productAvailable ? "Available" : "Out of Stock"}</p>
//       <p>{product.stockQuantity}</p>
//       {product.imageName && (
//         <img
//           src={`/api/product/${product.id}/image`}
//         alt={product.imageType}
//           width="200"
//         />
//       )}
//       <Link to={`/edit-product/${product.id}`}>Edit Product</Link>
//     </div>
//   );
// }

// export default ProductDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "./ProductDetails.css"

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Fetch the product details
    axios.get(`/api/product/${id}`)
      .then(response => {
        setProduct(response.data);
        return axios.get(`/api/product/${id}/image`, { responseType: 'blob' });
      })
      .then(response => {
        // Create a URL for the image blob and set it as the image source
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      })
      .catch(error => console.error('There was an error fetching the product data:', error));

    // Cleanup function to revoke the image URL
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <div className="product-details-container">
  

      <h2 className="product-title">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <p><strong>Release Date:</strong> {product.releaseDate}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Availability:</strong> {product.productAvailable ? "Available" : "Out of Stock"}</p>
      <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={product.imageName}
          width="200"
           className="product-image"
        />
      )}
      <Link to={`/edit-product/${product.id}`} className="edit-product-link"> Edit Product</Link>
    </div>
    </div>
  );
}

export default ProductDetails;
