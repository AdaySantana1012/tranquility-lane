import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase
import { useAuth } from '../../firebase/firebase';

import './UserProfile.scss'


const UserProfile = () => {
    // Firebase
    const {signOut, currentUser} = useAuth();
    // Router
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate("/");
    }
    useEffect(() => {
        if(!currentUser) {
            navigate("/")
        }
    },[currentUser, navigate])
    return ( 
        <div className="user-profile">
            <h2>{`Bienvenido ${currentUser ? (currentUser.displayName + '!!') : '!!'}`}</h2>
            <p>Te damos la bienvenida a Open Bank Close</p>
            <p>En unos días activaremos tus servicios</p>
            <h3>Gracias por confiar en Open Bank</h3>
            <button
                type="button"
                className='btn btn-secondary'
                onClick={() => handleSignOut()}
            >Cerrar Sesión</button>
        </div>
     );
}
 
export default UserProfile;