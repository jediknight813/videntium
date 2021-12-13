import '../styles/headerStyles.css';
import page_logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { check_if_user_is_logged_on, download_image, Logout_user_in_firebase, return_current_user_data} from './firebase';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


var Sidebar = <div> </div>


var profile_picture = ""

function profile_image(image) {
    profile_picture = image
}


function return_profile_image() {
    return profile_picture
}

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
        const navigate = useNavigate();
        download_image(data['profile_image'])


        function Logout_user() {
            Logout_user_in_firebase()
            navigate("/")
        }

        function to_profile() {
            navigate("/UserPersonalProfile")
        }

        function to_create_new_post() {
            navigate("/makeNewPost")
        }

        function to_front_page() {
            navigate("/")
        }

        return(
            <div>

                <Link to="/UserPersonalProfile">
                    <img alt="profile_image" className="profile_image" src={profile_picture} /> <h1 className="header_profile_name_text"> {data['username']} </h1>
                </Link>

                <button onClick={() => Logout_user()} className="logout_button"> logout </button> <button onClick={() => to_profile()} className="header_profile_button"> profile </button>
                <button onClick={() => to_create_new_post()} className="header_new_post_button"> create post </button>
                <button onClick={() => to_front_page()} className="header_home_button"> home </button>
            
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


                <div className="make_user_sign_in"> 
                    <h1 className='make_user_sign_up_text'> Sign up to get your ideas today! </h1>

                    <Link to="/Login">
                        <button className="force_user_signin_button"> Log in </button>
                    </Link>
        
                    <Link to="/SignUp">
                        <button className="force_user_login_button"> Sign up </button>
                    </Link>

                </div> 
            
            </div>
        );
    }


    return (
        <div className="loginHeader_banner"> 

            <div className="header_line"> </div>
            <Link to="/" >
                <h1 className="logo_text"> Videntium </h1>
            </Link>

            <Sidebar />
      

        </div>
    );
}

export { profile_image, return_profile_image }

export default Header