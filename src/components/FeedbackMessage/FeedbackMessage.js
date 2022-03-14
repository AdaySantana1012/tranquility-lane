import React from 'react';
import {Link} from 'react-router-dom'

// Lotties
import './FeedbackMessage.scss';

const FeedbackMessage = ({type, code, message, setFeedback}) => {
    
      // Close feedback PopUp
    const handleCloseModal = () => {
        setFeedback({
            isActive:false,
        })
    }
    return ( 
        <>
            <div className="feedback-content">
                <div className="feedback-content__header">
                    <button 
                        type='button'
                        onClick={() => handleCloseModal()}
                    >&times;</button>
                </div>
                {type === 'error' ? (
                    <div className="feedback-content__message">
                        
                        <div>
                            {code === 'auth/email-already-in-use' ? 
                            (
                                <>
                                    <h3>!Ha ocurrido un error!</h3>
                                    <p> Este correo electrónico ya existe</p>
                                </>
                            ) : (
                                <p>{message}</p> 
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="feedback-content__message">
                        
                        <div>
                            <h3>¡Se ha registrado con éxito!</h3>
                            <p>{message}</p>
                        </div>
                    </div>
                )}
                {type === 'error' ? (
                    <div className="feedback-content__footer footer-error">
                        <button 
                            type='button'
                            onClick={() => handleCloseModal()}
                        >Volver a intentarlo</button>
                    </div>

                ) : (
                    <div className="feedback-content__footer footer-success">
                        <Link to={"/profile"}>
                            <button 
                                type='button'
                                onClick={() => handleCloseModal()}
                                className="btn btn-secondary"
                            >Continuar</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="feedback-overlay"></div>
        </>
     );
}
 
export default FeedbackMessage;