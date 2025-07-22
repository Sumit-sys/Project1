import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8081/api/auth/login', {
        email,
        password
      });

      if (res.data.login) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/payment');
      } else {
        alert('Invalid credentials');
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('An error occurred while logging in. Please try again later.');
      }
    }
  };

  // 🔶 Internal CSS styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    },
    input: {
      width: '90%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    },
    link: {
      marginTop: '15px',
      fontSize: '14px',
      display: 'block'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        style={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>Login</button>
      <p style={styles.link}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

