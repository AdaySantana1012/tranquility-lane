import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { useAuth } from "../../firebase/firebase";

// Assets
import infoSvg from '../../assets/img/tranquility-bienvenido.svg';

import './ProductInformation.scss'

const ProductInformation = () => {
    // Firebase
    const {currentUser} = useAuth();
    // Router
    const navigate = useNavigate();
    // States
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

    useEffect(() => {
        if(currentUser) {
            navigate("/profile")
        }
    })
    return(
        <div className="accepteance">
        <div className="accepteance__info">
            <div className="accepteance__content">
                <div>
                    <h1>Bienvenido a Tranquility Lane.</h1>
                    <p>A través de este asistente podrás crear una cuenta con nosotros y disfrutar de nuestros servicios</p>
                </div>
                <div>
                    <h3>¿Qué datos te pediremos?</h3>  
                    <p>Como cliente, necesitamos tu nombre y apellidos, tu correo electrónico y una contraseña. No te preocupes, no te pediremos más datos de los necesarios.</p>      
                </div>
            </div>
            <div className="accepteance__image">
                <img 
                    src={infoSvg} 
                    alt='Imagen Bienvenida'
                ></img>
            </div>
        </div>
        <div className="accepteance__validate">
            <div className="accepteance__validate-checkbox">
                <input 
                    type="checkbox" 
                    id="accepteance"
                    name="accepteance"
                    checked={isPrivacyChecked}
                    onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
                />
                <label htmlFor='accepteance'>Antes de seguir es importante que verifiques que eres mayor de 18+ y has leído y aceptas nuestra <Link to="#">política de privacidad</Link></label>
            </div>
            <div className="accepteance__validate-actions">
                <Link to="/nuevo-cliente">
                    <button 
                        type="button"
                        className={`btn btn-secondary ${!isPrivacyChecked ? ('btn-btn-disabled') : '' }`}
                        disabled = {!isPrivacyChecked}
                    >Continuar</button>
                </Link>
            </div>
        </div>
    </div>
       
    );
}

export default ProductInformation;