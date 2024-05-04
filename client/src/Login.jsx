import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                if (data === "Success") {
                    navigate('/');
                } else {
                    throw new Error('Login failed');
                }
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div className='signup_container'>
            <div className='signup_form'>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Correo:</label>
                        <input type="email" placeholder="javi@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" placeholder="*****" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="signup_btn">Entrar</button>
                </form>
                <br></br>
                <p>No tengo una cuenta.</p>
                <Link to="/register"><button className='signup_btn'>Crear Cuenta</button></Link>
            </div>
        </div>
    );
}

export default Login;
