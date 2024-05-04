import "./styles.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            if (response.ok) {
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
        }
    }

    return (
        <div className='signup_container'>
            <div className='signup_form'>
                <h2>Resgistrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre de Usuario:</label>
                        <input type="text" placeholder="Paqui" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Correo:</label>
                        <input type="email" placeholder="javi@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" placeholder="*****" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
                <br></br>
                <p>Ya tienes una cuenta.</p>
                <Link to="/login"><button className='signup_btn'>Iniciar sesión</button></Link>
            </div>
        </div>
    );
}

export default Register;
