import React, {useState} from 'react';
import { Outlet, Link, useNavigate} from 'react-router-dom';

// Firebase
import { useAuth } from '../firebase/firebase';

// Components
import SignUpForm from '../components/SignUpForm/SignUpForm';

// Assets
import logo from '../assets/img/tranquility-lane-logo.svg';

const Layout = () => {
    // Firebase
    const { signOut, currentUser } = useAuth();
    // Router
    const navigate = useNavigate();
    // States
    const [isLoginOpen, setIsLoginOpen ] = useState(false);


    
    // Open Login Modal
    const handleLogin = async () => {
        setIsLoginOpen(true);
    }

    // Close firebase current session 
    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    }
    return ( 
        <>
            <header className="header">
                <nav className="header__nav container">
                    <div className="header__logo">
                        <Link to="/">
                            <img src={logo} alt="Imagen Logo" width={150}/>
                        </Link>
                    </div>
                    <div className="header__sign">
                        {currentUser ? (
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => handleSignOut()}
                                >Cerrar Sesión</button>

                        ) : (
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => handleLogin() }
                                >Accede a tu cuenta</button>
                        )} 
                    </div>
                </nav>
            </header>
            {isLoginOpen ? 
                <SignUpForm 
                    setIsLoginOpen = {setIsLoginOpen}
                /> : null }
            <div className="layout-assistant container card">
                <div className="layout-assistant__header"></div>
                <div className="layout-assistant__content">
                    <Outlet />
                </div>
            </div>
        </>
     );
}
 
export default Layout;