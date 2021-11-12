import React from "react";
import '../styles/headerStyles.css';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { check_password, get_user_data} from "./firebase";
import { check_for_invalid_characters } from './signUpUser'


function LoginUser() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function check_username_and_password() {
        
        if (username != null && password != null && check_for_invalid_characters(username) === false) {
            get_user_data(username, password)
            var x = check_password(password)


            if (x === false) {
                console.log('data not found or incorrect password')
            }
            if (x === true) {
                navigate('/')
            }
        }
 
        else {
            if (check_for_invalid_characters(username) === true) {
                 document.getElementById('enter_username').placeholder="invalid characters"
                 document.getElementById('enter_username').value = ""
            }
        }

}


    return (
        <div className="SignInUserBackground">
            <h1> login </h1>
            
            <h3> enter username </h3>
            <input id="enter_username" onChange={event => setUsername(event.target.value)} className="input_for_sign_in" placeholder="username" type="email" />


            <h3> enter password </h3>
            <input onChange={event => setPassword(event.target.value)}  className="input_for_sign_in" placeholder="password" type="password" />

            <button onClick={() => check_username_and_password()} className="confirm_buttom" > confirm </button>

        </div>
    )
}


export default LoginUser