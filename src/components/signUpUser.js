import React, { useState } from "react";
import '../styles/headerStyles.css';
import {useNavigate} from 'react-router-dom';
import { writeUserData } from "./firebase";

function SignUpUser() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function Add_user_account() {

       if (username != null && password != null) {
           writeUserData(username, password)
           navigate('/')
       }

    }


    return (
        <div className="SignInUserBackground">
            <h1> create account </h1>
            
            <h3> enter username </h3>
            <input onChange={event => setUsername(event.target.value)} className="input_for_sign_in" placeholder="username" type="email" />


            <h3> enter password </h3>
            <input onChange={event => setPassword(event.target.value)}  className="input_for_sign_in" placeholder="password" type="password" />

            <button onClick={() => Add_user_account()} className="confirm_buttom" > confirm </button>

        </div>
    )
}

export default SignUpUser