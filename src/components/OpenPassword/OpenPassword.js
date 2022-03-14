import React from 'react';
import './OpenPassword.scss';

// Assets
import eyeIcon from '../../assets/img/eye-icon.svg'
import closeEyeIcon from '../../assets/img/close-eye-icon.svg'

export const OpenPassword = ({isOpenPassword, showPassword}) => {
    return ( 
        <button 
            type='button'
            className='password-icon'
            onClick={(e) => showPassword(e)}
        >
            <img className='eye-open' width={30} src={!isOpenPassword ? eyeIcon : closeEyeIcon} alt="Icono de password" id="password-icon"/>
        </button>
     );
}

export const ConfirmOpenPassword = ({isConfirmOpenPassword, showPassword}) => {
    return(
        <button 
            type='button'
            className='password-icon'
            onClick={(e) => showPassword(e)}
        >
            <img className='eye-open' width={30} src={!isConfirmOpenPassword ? eyeIcon : closeEyeIcon} alt="Icono de password" id="confirm-password-icon"/>
        </button>
    )
}
 