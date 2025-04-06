import React from 'react';
import { Link } from 'react-router-dom';
import '../File1.css';

export default function Market() {
  return (
    <>
      <div className="header">
        <h3>Alpha Finance</h3>
        <input
          type="text"
          placeholder="Search for stock prices of various companies"
          id="pickme"
        />
        <button onClick={() => alert("Search feature not implemented yet!")}>🔍</button>
        <Link to="/news">News</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="market-content">
        <h2>Welcome to the Market Page</h2>
        <p>Market data will go here...</p>
      </div>
    </>
  );
}

