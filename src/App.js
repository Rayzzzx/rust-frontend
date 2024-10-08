import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We'll create this file next

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', { username, password });
      setMessage(response.data);
      fetchUsers();
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      setMessage(response.data);
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rust + React App</h1>
      </header>
      <main>
        <section className="form-section">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <button onClick={handleLogin}>Login</button>
        </section>
        {message && <p className="message">{message}</p>}
        <section className="users-section">
          <h2>Users:</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;