import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from "./App";

function Navbar() {
    const user = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/logout');
            if (response.ok) {
                const data = await response.json();
                if (data === "Success") {
                    navigate('/');
                }
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <div className='navbar-header'>
            <div><h3>Blog App</h3></div>
            <div>
            <Link to="/" className='link'>Inicio</Link>
            {
                user.username ? 
                    <Link to="/publicar" className='link'>Publicar</Link>
                : <></>
            }
            <a href="/contactar" className='link'>Contactar</a>
            </div>
            {
                user.username ?
                <div>
                    <input type="button" value="Logout" onClick={handleLogout} className="btn_input"/>
                </div>
                :
                <div><h5><Link to="/register" className="link">Registrarse/Login</Link></h5></div>
            }
        </div>
    );
}

export default Navbar;
