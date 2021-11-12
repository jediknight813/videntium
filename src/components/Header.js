import '../styles/headerStyles.css';
import page_logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { check_if_user_is_logged_on, Logout_user_in_firebase, return_current_user_data } from './firebase';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


var Sidebar = <div> </div>


function Header() {
    const [count, setCount] = useState(0);
    setTimeout(() => {
        setCount(count + 1)
      }, 1000);

    
    if (check_if_user_is_logged_on() === true) {
        Sidebar = User_logged_in
    }
    else {
        Sidebar = Usernotloggedin
    }


    function User_logged_in() {
        let data = return_current_user_data()
        console.log(data[ 'username' ])
        const navigate = useNavigate();

        function Logout_user() {
            Logout_user_in_firebase()
            navigate("/")
        }

        return(
            <div>

                <Link to="/UserPersonalProfile">
                    <img alt="profile_image" className="profile_image" src={data['profile_image']} />
                </Link>

                <button onClick={() => Logout_user()} className="logout_button"> logout </button>

            </div>
        )
    }

    function Usernotloggedin() {
        return (
            <div>
    
                <Link to="/Login">
                    <button className="login_button"> Log in </button>
                </Link>
    
                <Link to="/SignUp">
                    <button className="signup_button"> Sign up </button>
                </Link> 
            
            </div>
        );
    }


    return (
        <div className="loginHeader_banner"> 
            
            <Link to="/" >
                <img className="website_logo" alt="logo" src={page_logo} /> <h1 className="logo_text"> Videntium </h1>
            </Link>

            <Sidebar />
      

        </div>
    );
}

export default Header