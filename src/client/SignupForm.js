import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
        cpassword,
      });
      console.log('Server response:', response.data);

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      setcPassword('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already registered');
      } else {
        console.error('Error signing up:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <input
        type="password"
        placeholder="Confirm Password"
        value={cpassword}
        onChange={(e) => setcPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
