import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === 'admin' && password === 'password123') {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
