import React, {useState} from 'react';
import {Link} from 'react-router-dom'

// Firebase
import { useAuth } from '../../firebase/firebase';

// Formik
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Components
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { OpenPassword, ConfirmOpenPassword } from '../../components/OpenPassword/OpenPassword'

// Assets

import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';

import './CreateNewUser.scss';

const UserForm = () => {
    // Firebase
    const { signUp } = useAuth();
    // States
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const [isConfirmOpenPassword, setIsConfirmOpenPassword] = useState(false);
    const [feedback, setFeedback] = useState({
        isActive: false,
        type: '',
        code: '',
        message: ''
    });

    // Create a userSchema for validate the form fields using Yup and Formik
    const userSchema = Yup.object().shape({
        userName: Yup.string()
                        .max(60, "El nombre es demasiado largo")
                        .required("Este campo es obligatorio"),
        userEmail: Yup.string()
                        .email()
                        .required('Este campo es obligatorio'),
        password: Yup.string()
                        .required('Debes introducir una contraseña')
                        .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Tu contraseña debe tener al menos 8 caracteres, letras minúsculas, letras mayúsculas y un símbolo'),
        confirmPassword: Yup.string()
                            .required("Este campo es obligatorio")
                            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales'),
        clueWord: Yup.string()
                        .max(255, "La pista es demasiado larga, máximo 255 caracteres")
    })

    // Handle state change for password type field
    const showPassword = (e) => {
        switch(e.target.id) {
            case "password-icon"
                : setIsOpenPassword(!isOpenPassword);
            break;
            case "confirm-password-icon"
                : setIsConfirmOpenPassword(!isConfirmOpenPassword);
            break;
            default:
                return;
        }
    }
    
    // Once it submits the form change the state context with temporary object from formik
    const handleSubmit = async ({userName, userEmail, password}) => {
        try {
            await signUp(userName, userEmail, password);
            setFeedback({
                isActive: true,
                type: 'success',
                message: 'Registro completado. Ya puede acceder a su cuenta pulsando en "siguiente"',
                code: ''
            });
        } catch (error) {
            console.log(error);
            setFeedback({
                isActive: true,
                type: 'error',
                message: 'Ha ocurrido un error. Vuélvalo a intentar más tarde',
                code: error.code
            });
        }
    }
    return ( 
        <div>
            <div className='form-info'>
                <h2>Crea una nueva cuenta de seguros en Tranquility Lane</h2>
                <p>Puedes crear una cuentan nueva con tu nombre y apellidos, correo electrónico y una contraseña</p>
                <p>También podrás escribir una pista para recordar la contraseña</p>
                <span className="pass-info">(La contraseña debe contener al menos 8 caracteres, un símbolo y una letra mayúscula)</span>
            </div>
            {feedback.isActive && 
                <FeedbackMessage
                   type={feedback.type}
                   code= {feedback.code}
                   message={feedback.message}
                   setFeedback = {setFeedback}
                />}
            <Formik 
                initialValues={{
                    userName: '',
                    userEmail : '',
                    password: '',
                    confirmPassword: '',
                    clueWord: ''
                }}
                onSubmit={(values, {resetForm}) => {
                    handleSubmit(values)
                    resetForm();
                }}
                validationSchema = {userSchema}
            >
                {/* Validation Function from Formik */}
                {({touched, errors}) => {
                    return(
                        <Form 
                            className="form"
                        >
                            <div className="form-control">
                                <div className="form-control__input-group">
                                    <label htmlFor="userName">Tu nombre</label>
                                    <Field 
                                        type="text"
                                        name='userName'
                                        id='userName'
                                        placeholder='Ejemplo: John Doe'
                                        autoComplete="user-name"
                                    />
                                    {errors.userName && touched.userName ? (
                                        <ErrorMessage>
                                            {errors.userName}
                                        </ErrorMessage>
                                    ) : null}
                                </div>
                                <div className="form-control__input-group">
                                    <label htmlFor="userEmail">Correo Electrónico</label>
                                    <Field 
                                        type="email"
                                        name='userEmail'
                                        id='userEmail'
                                        placeholder='Ejemplo: johndoe@johndoe.com'
                                    />
                                    {errors.userEmail && touched.userEmail ? (
                                        <ErrorMessage>
                                            {errors.userEmail}
                                        </ErrorMessage>
                                    ): null}
                                </div>
                                <div className="form-control__input-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field 
                                        type={isOpenPassword ? 'text' : 'password'}
                                        name='password'
                                        id='password'
                                        autoComplete="new-password"
                                    />
                                    <OpenPassword 
                                        isOpenPassword={isOpenPassword}
                                        showPassword={showPassword}
                                    />
                                    {errors.password && touched.password ? (
                                        <ErrorMessage>
                                            {errors.password}
                                        </ErrorMessage>
                                    ) : null}
                                </div>
                                <div className="form-control__input-group">
                                    <label htmlFor="confirmPassword">Confirma la contraseña</label>
                                    <Field 
                                        type={isConfirmOpenPassword ? 'text' : 'password'}
                                        name='confirmPassword'
                                        id='confirmPassword'
                                        autoComplete="new-password"
                                    />
                                    <ConfirmOpenPassword
                                        isConfirmOpenPassword={isConfirmOpenPassword}
                                        showPassword={showPassword}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <ErrorMessage>
                                            {errors.confirmPassword}
                                        </ErrorMessage>
                                    ): null}
                                </div>
                                <div className="form-control__input-textarea">
                                    <label htmlFor='clueword'>Escribe una pista para recordar la contraseña. Máximo 255 caracteres</label>
                                    <Field 
                                        type="text"
                                        as="textarea"
                                        name="clueword"
                                        id="clueword"
                                        className="input-textarea__textarea"
                                        />
                                    {errors.clueWord && touched.clueWord ? (
                                        <ErrorMessage>
                                            {errors.clueWord}
                                        </ErrorMessage>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form__actions">
                                <Link to="/">
                                    <button type="button">Volver</button>
                                </Link>
                                <input 
                                    type="submit"
                                    className='btn btn-secondary'
                                    value="Crear Contraseña"
                                />
                            </div>
                        </Form>  
                    )
                }}
            </Formik>
        </div>
     );
}
 

export default UserForm;