import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { 
        loginEmail, loginPassword, onInputChange: onLoginInputChange 
    } = useForm(loginFormFields);

    const { 
        registerName, registerEmail, registerPassword, registerPassword2,  onInputChange: onRegisterInputChange 
    } = useForm(registerFormFields);

    const onLoginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword })
    }

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        if( registerPassword !== registerPassword2 ) {
            Swal.fire('Wrong', 'Password must be same');
            return;
        }

        startRegister({ 
            name: registerName, email: registerEmail, password: registerPassword 
        });
    }

    useEffect(() => {
      if( errorMessage !== undefined ) {
        Swal.fire('Wrong', errorMessage, 'error')
      }
    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ onLoginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                onChange={ onLoginInputChange }
                                value={ loginEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                onChange={ onLoginInputChange }
                                value={ loginPassword }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ onRegisterSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                onChange={ onRegisterInputChange }
                                value={ registerName }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                onChange={ onRegisterInputChange }
                                value={ registerEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                onChange={ onRegisterInputChange }
                                value={ registerPassword } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                onChange={ onRegisterInputChange }
                                value={ registerPassword2 }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}