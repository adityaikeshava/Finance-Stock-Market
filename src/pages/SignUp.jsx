import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/OAuth.jsx';
import '../SignUp.css'; 

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
  
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });
  
     
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log('Signup successful:', data);
  
      if (data.success === false) {
        throw new Error(data.message || 'Signup failed');
      }
  
      navigate('/sign-in');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type='text'
          placeholder='Username'
          className='signup-input'
          id='username'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='signup-input'
          id='email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='signup-input'
          id='password'
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className='signup-button'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Oauth />
      </form>
      <div className='signup-footer'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='signup-link'>Sign in</span>
        </Link>
      </div>
      {error && <p className='signup-error'>{error}</p>}
    </div>
  );
}
