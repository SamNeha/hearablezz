import React, { useContext, useRef, useState } from 'react';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import Swal from 'sweetalert2';
import BillingAddressForm from './BillingAddressForm';
import { Link, useNavigate } from 'react-router-dom';

const AccountForm = () => {
    const { isFormOpen, toggleForm } = useContext(commonContext);
    const { inputValues, handleInputValues } = useForm();
    const formRef = useRef();
    useOutsideClose(formRef, () => {
        toggleForm(false);
    });
    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);
    const [isBillingAddressVisible, setIsBillingAddressVisible] = useState(false); // Define isBillingAddressVisible
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (isSignupVisible) {
            const userData = {
                username: inputValues.username,
                email: inputValues.email,
                password: inputValues.password,
                conf_password: inputValues.conf_password,
            };

            try {
                // Make an API request to your server for signup
                const response = await fetch('https://hearables-backend.onrender.com/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    // Handle successful signup
                    Swal.fire({
                        icon: 'success',
                        title: 'Signup Successful',
                        text: 'You have successfully registered!',
                    });
                } else {
                    const data = await response.json();
                    // Handle signup errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Signup Failed',
                        text: data.message,
                    });
                }
            } catch (error) {
                // Handle network or server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: 'An error occurred while registering.',
                });
            }
        } else {
            // Redirect to the BillingAddressForm after clicking "Login"
            navigate('/bill');
        }
    };

    const handleIsSignupVisible = () => {
        setIsSignupVisible((prevState) => !prevState);
    };

    return (
        <>
            {isFormOpen && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>
                            <div className="form_head">
                                <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                                <p>
                                    {isSignupVisible
                                        ? 'Already have an account ?'
                                        : 'New to X-Beat ?'}
                                    &nbsp;&nbsp;
                                    <button type="button" onClick={handleIsSignupVisible}>
                                        {isSignupVisible ? 'Login' : 'Create an account'}
                                    </button>
                                </p>
                            </div>

                            <div className="form_body">
                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="input_field"
                                            value={inputValues.username || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Username</label>
                                    </div>
                                )}

                                <div className="input_box">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="input_field"
                                        value={inputValues.email || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Email</label>
                                </div>

                                <div className="input_box">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="input_field"
                                        value={inputValues.password || ''}
                                        onChange={handleInputValues}
                                        required
                                    />
                                    <label className="input_label">Password</label>
                                </div>

                                {isSignupVisible && (
                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="conf_password"
                                            id="conf_password"
                                            className="input_field"
                                            value={inputValues.conf_password || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Confirm Password</label>
                                    </div>
                                )}

                                {isSignupVisible ? (
                                    <button className="btn login_btn">Signup</button>
                                ) : (
                                    // Display the "Login" button and BillingAddressForm if visible
                                    <>
                                        <button className="btn login_btn">Login</button>
                                        {isBillingAddressVisible && <BillingAddressForm />}
                                    </>
                                )}
                            </div>

                            <div
                                className="close_btn"
                                title="Close"
                                onClick={() => toggleForm(false)}
                            >
                                &times;
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountForm;  
