// src/GoogleSignInButton.js
import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from '../firebaseConfig';

const GoogleSignInButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log('User Info:', user);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleSignIn}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {user.displayName || 'User'}</p>
          <button onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleSignInButton;
