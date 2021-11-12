import React, { useState } from "react";
import '../styles/headerStyles.css';
import {useNavigate} from 'react-router-dom';
import { writeUserData, get_user_data, check_if_username_is_taken, user_is_taken_data_checker } from "./firebase";


function check_for_invalid_characters( string ) {
    if (string !== undefined) {
        if (string.includes('.', '#', '$', '[', ']')) {
            return true
        }
        else {
            return false   
        }
    }
    else {
        return false
    }
}




function SignUpUser() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function Add_user_account() {
        check_if_username_is_taken(username)
        console.log(user_is_taken_data_checker(username))

       if (username !== '' && password !== '' && user_is_taken_data_checker(username) === false) {

           if (user_is_taken_data_checker(username) === false) {
           writeUserData(username, password)
           get_user_data(username, password)
           navigate('/')
           }
       }

       else {

           if (check_for_invalid_characters(username) === true) {
                document.getElementById('enter_username').placeholder="invalid characters"
                document.getElementById('enter_username').value = ""
           }


           if (user_is_taken_data_checker(username) === true) {
            document.getElementById('enter_username').placeholder="username taken"
            document.getElementById('enter_username').value = ""
           }
       }

    }


    return (
        <div className="SignInUserBackground">
            <h1> create account </h1>
            
            <h3> enter username </h3>
            <input id="enter_username" onChange={event => setUsername(event.target.value)} className="input_for_sign_in" placeholder="username" type="email" />


            <h3> enter password </h3>
            <input onChange={event => setPassword(event.target.value)}  className="input_for_sign_in" placeholder="password" type="password" />

            <button onClick={() => Add_user_account()} className="confirm_buttom" > confirm </button>

        </div>
    )
}


export { check_for_invalid_characters }
export default SignUpUser

