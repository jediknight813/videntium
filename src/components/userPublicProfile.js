import React, { useState } from "react";
import Post from "./Post";
import { return_current_user_data, download_post_image } from "./firebase";
import {useNavigate} from 'react-router-dom';
import '../styles/profileStyles.css'
import { following_user, Unfollow_user, add_follower, remove_follower } from "./firebase";


var current_user = "asd"

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
    
    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
        all_posts = data.data['allPosts']
        user_data = data.data['data']
        //console.log(data)
        var func = data.data['user_to_display'].data[1]
        username = user_data['username']
    }


    const navigate = useNavigate();

    let check_if_user = return_current_user_data()
    
    //check if user is following
    // if user is following have unfollow action, else have follow action
    
    if (check_if_user['username'] === username) {
        navigate("/UserPersonalProfile")
    }

    const [buttonText, setButtonText] = useState("Follow")

    
    function follow_or_unfollow_user() {
        if (buttonText === "Follow") {
            following_user(user_data['username'])
            add_follower(user_data)
            setButtonText("Unfollow")
            return

        }
        else {
            Unfollow_user(user_data['username'])
            remove_follower(user_data)
            setButtonText("Follow")
            return
        }

    }

    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
            //checks if you are following the user

        download_post_image(user_data['profile_image']).then(
            function(value) { 
            setImage(value)
            }
        );
    }

    function UserImage() {
        if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
            if (user_data['followers'].includes(check_if_user['username'])){
                setButtonText("Unfollow")
            }


            return (
                <div> 
                    <div className="UserImageBox">
                        <img className="user_profile_image" alt="profile_image" src={image} />
                        <h1 className="profile_username"> {user_data['username']} </h1>
                        <button onClick={() => follow_or_unfollow_user()} className="public_follow_button"> { buttonText } </button>

                </div>

                    <div className="user_profile_posts">

                        {user_data['posts'].map(Element => 
                            <Post data={[ data.data['allPosts'][Element], func]} />
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

