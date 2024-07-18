import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [Correo, setCorreo] = useState('');
    const [Contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('loggedIn');
        if (userLoggedIn) {
            navigate('/forecast');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://localhost:7080/api/Authlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Correo, Contrasena })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del logueo:', data);
            setMensaje('Credenciales correctas!');
            onLogin();
            navigate('/forecast'); // Redirige a la página principal después de iniciar sesión
        } else {
            const errorData = await response.json();
            setMensaje('Credenciales incorrectas!');
            console.log('Error en el logueo:', errorData);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Correo">Email:</label>
                    <input
                        type="email"
                        id="Correo"
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Contrasena">Password:</label>
                    <input
                        type="password"
                        id="Contrasena"
                        value={Contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <button type="submit">Ingresar</button>
                {mensaje && <p>{mensaje}</p>}
            </form>
        </div>
    );
};

export default Login;
