import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Firebase
import { useAuth } from '../../firebase/firebase';

// Formik
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

// Components
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { OpenPassword } from '../OpenPassword/OpenPassword';

// Assets
import logo from '../../assets/img/tranquility-lane-logo.svg';

import './SignUpForm.scss';

const SignUpForm = ({setIsLoginOpen}) => {
    // Firebase
    const {login} = useAuth();
    // Router
    const navigate = useNavigate();
    const location = useLocation();
    // States
    const [feedback, setFeedback] = useState({
        isActive: false,
        type: '',
        code: '',
        message: ''
    });
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    // User validation options
    const userSchema = Yup.object().shape({
        userEmail : Yup.string()
                        .required('Este campo es obligatorio')
                        .email('Debes introducir un correo electrónico válido'),
        userPassword: Yup.string()
                            .required('Debes introducir una contraseña')
                            
    })

    const handleSubmit = async ({userEmail, userPassword}) => {
        try {
            await login(userEmail, userPassword);
            setIsLoginOpen(false);
            if(location.pathname !== "/profile") {
                navigate("/profile");
            }
            
        } catch (error) {
            setFeedback({
                isActive: true,
                type : 'error',
                code : '',
                message: 'Contraseña o email incorrecto, inténtelo de nuevo'
            })
        }
    }
    const showPassword = (e) => {
        setIsOpenPassword(!isOpenPassword);
    }
    return ( 
        <>
            {feedback.isActive ? (
                <FeedbackMessage 
                    type={feedback.type}
                    code= {feedback.code}
                    message= {feedback.message}
                    setFeedback= {setFeedback}
                />
            ) :  null}
            <div className="login-form__card-content">
                <div className="login-form__card-header">
                    <button
                        type='button'
                        onClick={() => setIsLoginOpen(false)}
                    >&times;</button>
                </div>
                <div>
                    <img src={logo} alt="Imagen logo" width={150}></img>
                </div>
                <div>
                    <h3>Inicia sesión con tu usuario y contraseña</h3>
                    <div className="login-form__form">
                        <Formik
                            initialValues={{
                                userEmail : '',
                                userPassword: ''
                            }}
                            onSubmit={(values, {resetForm}) => {
                                handleSubmit(values)
                                resetForm();
                            }}
                            validationSchema={userSchema}
                        >
                            {({errors, touched}) => {
                                return(
                            <Form>
                                <div className="login-form__input-group">
                                    <label htmlFor='userEmail'>Correo Electrónico</label>
                                    <Field 
                                        type="email"
                                        name="userEmail"
                                        id="userEmail"
                                        autoComplete="email"
                                        placeholder="johndoe@johndoe.com"
                                    />
                                    {errors.userEmail && touched.userEmail ? (
                                        <ErrorMessage>
                                            {errors.userEmail}
                                        </ErrorMessage>
                                    ) : null}
                                </div>
                                <div className="login-form__input-group">
                                    <label htmlFor='userPassword'>Contraseña</label>
                                    <Field 
                                        type={isOpenPassword ? 'text' : 'password'}
                                        name="userPassword"
                                        id="userPassword"
                                        autoComplete="user-password"
                                        placeholder="Tu contraseña"
                                    />
                                    <OpenPassword 
                                        isOpenPassword={isOpenPassword}
                                        showPassword={showPassword}
                                    />
                                    {errors.userPassword && touched.userPassword ? (
                                        <ErrorMessage>
                                            {errors.userPassword}
                                        </ErrorMessage>
                                    ) : null}
                                </div>
                                <div className="login-form__input-submit">
                                    <input 
                                        type='submit'
                                        className='btn btn-secondary'
                                        value={'Iniciar Sesión'}
                                    ></input>
                                </div>
                            </Form>
                            )}}
                        </Formik>
                    </div>
                </div>
            </div>
        <div className="login-form__overlay" onClick={() => setIsLoginOpen(false)}></div>
        </>
     );
}
 
export default SignUpForm;