import React from "react";
import Post from "./Post";
import '../styles/profileStyles.css';
import { check_if_user_is_logged_on } from "./firebase";
import { Link } from 'react-router-dom';

function FrontPage(data){
    //console.log(data)
    var all_posts = []

    function CheckIfUserIsSignedIn() {
        if (check_if_user_is_logged_on() === true) {
            return (
                <div> </div>
            )
        }
        else {
            return (
                <div className="make_user_sign_in"> 
                    <h1 className='make_user_sign_up_text'> Sign up to get your ideas today! </h1>

                    <Link to="/Login">
                        <button className="force_user_signin_button"> Log in </button>
                    </Link>
        
                    <Link to="/SignUp">
                        <button className="force_user_login_button"> Sign up </button>
                    </Link>

                </div> 
            )
        }
    }

    if (data.data !== undefined) {
        //console.log(data.data['all_posts'])
        for (var i in data.data['all_posts']) {
            all_posts.push(i)
        }
    }

    if (data.data !== undefined && all_posts.length > 2) {
        all_posts.reverse();
        return (
            <div>
                <CheckIfUserIsSignedIn />
                <div className="front_page_posts">
                    {all_posts.map(Element => 

                    <Post data={ [ data.data['all_posts'][Element], data.data['func'].data, Element ] } />
                    )}         

                </div>
             </div>
        )
    
    }
    else {
        return (
            <div> </div>
        )
    }
}


export default FrontPage