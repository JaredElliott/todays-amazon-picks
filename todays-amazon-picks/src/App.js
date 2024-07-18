import logo from './logo.svg';
import './App.css';
import GoogleSignInButton from './Components/GoogleSignInButton';
import { auth } from './firebaseConfig';
import ProductList from './Components/ProductList';
import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch('/SampleData/ProductApiResponse1.json')
      .then(response => response.json())
      .then(data => {
        // Log any errors
        if (data.Errors && data.Errors.length > 0) {
          console.warn('Errors in API response:', data.Errors);
        }
        // Filter out items that have accessibility issues 
        const accessibleItems = data.ItemResults.Items.filter(item => {
          return !data.Errors.some(error => error.Message.includes(item.ASIN));
        });
        setProducts(accessibleItems);
      })
      .catch(error => {
        setError('Failed to load products');
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Your App</h1>
      <p>Hello, {user ? user.displayName || 'User' : 'Guest'}</p>
      {user ? (
        <div>
          <GoogleSignInButton />
        </div>
      ) : (
        <div>
          <p>Please sign in to continue.</p>
          <GoogleSignInButton />
        </div>
      )}
      <div>
        <h2>Amazon Top Products</h2>
        {error ? <div>Error: {error}</div> : <ProductList products={products} />}
      </div>
    </div>
  );
}

export default App;
