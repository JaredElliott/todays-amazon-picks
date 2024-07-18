import logo from './logo.svg';
import './App.css';
import GoogleSignInButton from './GoogleSignInButton';
import { auth } from './firebaseConfig';
import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="App">
      <h1>Welcome to Your App</h1>
      <p>Hello, {user ? user.displayName || 'User' : 'Guest'}</p>
      {/* Place other authenticated user content here */}
      {user ? (
        <div>
          {/* Render authenticated user content, should show signout button if signed in */}
          <GoogleSignInButton />
        </div>
      ) : (
        <div>
          {/* Render sign-in button or other guest content */}
          <p>Please sign in to continue.</p>
          <GoogleSignInButton />
        </div>
      )}
    </div>
  );
};

export default App;
