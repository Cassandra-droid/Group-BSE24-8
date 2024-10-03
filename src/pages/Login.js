import React, { useState } from 'react';
import "../styles/Login.css"; 

function Signup() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/login`;
    const user = { username: loginUsername, password: loginPassword };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Success:', data);
        window.location.href = "/order"; 
      } else {
        alert(data.message); 
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const url = `http://localhost:5000/api/auth/signup`;
    const user = { username: signupUsername, email: signupEmail, password: signupPassword };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log(response); 

      const data = await response.json();

      if (response.ok) {
        console.log('Signup Success:', data);
        alert('Signup successful! Please log in.');
        window.location.href = '/';
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      alert('An error occurred while signing up.');
    }
  };

  return (
    <div className="loginPage">
      <div className="leftSide">
        <h1>Login</h1>
        <p>Already created an account? Please login!</p>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="loginUsername">Username</label>
          <input
            type="text"
            id="loginUsername"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="rightSide">
        <h1>Sign Up</h1>
        <p>Don&apos;t have an account? Please first sign up!</p> {/* Use &apos; to escape the single quote */}
        <form onSubmit={handleSignupSubmit}>
          <label htmlFor="signupUsername">Username</label>
          <input
            type="text"
            id="signupUsername"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="signupEmail">Email</label>
          <input
            type="email"
            id="signupEmail"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            id="signupPassword"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
