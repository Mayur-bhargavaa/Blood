import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from "./loader";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      setIsLoading(false)  
      console.log('Server response:', response.data);

      // Reset form fields
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
        setIsLoading(false)  
      } else {
        console.error('Error logging in:', error.message);
        setIsLoading(false)  
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
 
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
      {error && <p>{error}</p>}
      {isLoading ? <LoadingSpinner /> : <a></a>}
      <button disabled={isLoading} type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
