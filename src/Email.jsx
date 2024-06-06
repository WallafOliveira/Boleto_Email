import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/email.css';

function Email() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/boleto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const boletosData = await response.json();
        const nomeUsuario = name.trim() !== '' ? name : 'Usuário';
        navigate('/app', { state: { boletos: boletosData, username: nomeUsuario } }); // Redireciona para o componente BoletoInfo com o estado contendo os dados do usuário
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="containner">
      <h2>Login</h2>
      <form onSubmit={handleLogin}> 
        <div className="label-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Nome:</label>
        </div>
        <div className="label-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username:</label>
        </div>
        <div className="label-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password:</label>
        </div>
        <button type="submit">Login</button>
        <button className="btn_cont" onClick={() => { navigate('/app') }}>Continuar</button>
      </form>
    </div>
  );
}

export default Email;
