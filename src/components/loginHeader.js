import '../styles/headerStyles.css';
import page_logo from '../images/logo.png'

import writeUserData from './firebase';


function loginHeader() {
    writeUserData()
    return (
        <div className="loginHeader_banner"> 
            <img className="website_logo" alt="logo" src={page_logo} /> <h1 className="logo_text"> Videntium </h1>
            <button className="login_button"> Log in </button>
            <button className="signup_button"> Sign up </button>
        </div>
    );
}


export default loginHeader