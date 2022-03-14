import React from 'react';
import './ErrorMessage.scss'
const ErrorMessage = ({children}) => {
    return ( 
        <div className="error">
            {children}
        </div>
     );
}
 
export default ErrorMessage;