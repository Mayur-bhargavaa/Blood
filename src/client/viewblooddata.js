import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBloodbank = () => {
    const [Product, setProducts] = useState([]);

    useEffect(() => {
      // Fetch the user data from the server
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/products');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching users:', error.message);
        }
      };
  
      fetchUsers();
    }, []);
  return (
<div>
    <h1>
        hello this is home page
    </h1>
    <div>
      <h2>User List</h2>
      <ul>
        {Product.map((Product) => (
          <li key={Product._id}>{Product.name} - {Product.price}  - {Product.description}</li>
        ))}
      </ul>
    </div>
</div>
  );
};

export default ViewBloodbank;