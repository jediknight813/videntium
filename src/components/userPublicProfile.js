import React, { useState, useEffect } from "react";
import Post from "./Post";
import { return_current_user_data, download_post_image } from "./firebase";
import {useNavigate} from 'react-router-dom';
import '../styles/profileStyles.css'
import { following_user, Unfollow_user, add_follower, remove_follower, check_if_user_is_logged_on, get__public_user_data } from "./firebase";
import DisplayUser from "./DisplayUser";
import FetchAndDisplayUserData from "./fetchAndDisplayUserData";


var current_user = "asd"
var following_check = false

function change_current_user(name) {
    current_user = name
    //console.log(name)
}

function get_current_user() {
    return current_user
}


function UserPublicProfile(data) {    
    const [image, setImage] = useState()
    var user_data = undefined
    var all_posts = undefined
    var username = ""

    

    const navigate = useNavigate();
    var check = check_if_user_is_logged_on()
    if (check === false) {
        navigate('/')
    }


    
    
    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
        all_posts = data.data['allPosts']
        user_data = data.data['data']
        var func = data.data['user_to_display'].data[1]
        username = user_data['username']
    }


    let check_if_user = return_current_user_data()


    
    //check if user is following
    // if user is following have unfollow action, else have follow action
    
    if (check_if_user['username'] === username) {
        navigate("/UserPersonalProfile")
    }

    const [buttonText, setButtonText] = useState("Follow")


    function follow_or_unfollow_user() {
        
        if (buttonText === "Unfollow") {
            setButtonText("Follow")
            Unfollow_user(user_data['username'])
            remove_follower(user_data)
            navigate("/")
            navigate("/UserPublicProfile")
        }

        else {
            setButtonText("Unfollow")
            following_user(user_data['username'])
            add_follower(user_data)
            navigate("/")
            navigate("/UserPublicProfile")
        }

    }

    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
        download_post_image(user_data['profile_image']).then(
            function(value) { 
            setImage(value)
            }
        );
    }

    var reverse = false
  
    function UserImage() {
        if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined && data.data['allUsers'] !== undefined && user_data !== undefined) {
            
            
            if (user_data['followers'].includes(check_if_user['username'])){
                setButtonText("Unfollow")
                console.log("its reseting")
            }

            if (Array.isArray(user_data['followers']) === false) {
                user_data['followers'] = []
            }

            if (Array.isArray(user_data['following']) === false) {
                user_data['following'] = []
            }

            if (Array.isArray(user_data['posts']) === false) {
                user_data['posts'] = []
            }

            if (reverse === false) {
                user_data['posts'].reverse();
                user_data['followers'].reverse();
                user_data['following'].reverse();
                reverse = true
            }

            function arrayRemove(arr, value) { 
    
                return arr.filter(function(ele){ 
                    return ele !== value; 
                });
            }

            user_data['following'] = arrayRemove(user_data['following'], "");
            user_data['followers'] = arrayRemove(user_data['followers'], "");
            

            return (
                <div> 
                    <div className="UserImageBox">
                        <img className="user_profile_image" alt="profile_image" src={image} />
                        <h1 className="profile_username"> {user_data['username']} </h1>
                        <button onClick={() => follow_or_unfollow_user()} className="public_follow_button"> { buttonText } </button>

                </div>
                <h1 style={{top: "32%", position: "absolute", left: "47.2%", color: "tomato"}}> Posts </h1>
                    <div className="user_profile_posts">

                        {user_data['posts'].map(Element => 
                            <Post data={[ data.data['allPosts'][Element], func]} />
                        )}        

                    </div>
                    
                    <h1 style={{top: "83%", position: "absolute", left: "46%", color: "tomato"}}> Followers </h1>
                    <div className="user_followers">

                        {user_data['followers'].map(Element => 
                            <DisplayUser data={[ data.data['allUsers'][Element], func]} />
                        )}        

                    </div>


                    <h1 style={{top: "113%", position: "absolute", left: "46%", color: "tomato"}}> Following </h1>
                    <div className="user_following">

                        {user_data['following'].map(Element => 
                            <DisplayUser data={[ data.data['allUsers'][Element], func]} />
                        )}        

                    </div>



                </div>
            )
        }
        else {
            return ( <div>  </div> )
        }

    }

    return(
        <div>
            <UserImage />
        </div>
    );
}


export {change_current_user, get_current_user}
export default UserPublicProfile

