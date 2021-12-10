import React, { useState } from "react";
import Post from "./Post";
import { return_current_user_data, download_post_image } from "./firebase";
import {useNavigate} from 'react-router-dom';

var current_user = "asd"

function change_current_user(name) {
    current_user = name
    console.log(name)
}

function get_current_user() {
    return current_user
}


function UserPublicProfile(data) {
    const [image, setImage] = useState()
    var user_data = undefined
    var all_posts = undefined
    
    
    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
        all_posts = data.data['allPosts']
        user_data = data.data['data']
        //console.log(data.data['allPosts'])
    }


    const navigate = useNavigate();

    let check_if_user = return_current_user_data()
    var username = ""

    if (check_if_user['username'] === username) {
        navigate("/")
    }

    if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
        download_post_image(user_data['profile_image']).then(
            function(value) { 
            setImage(value)
            }
        );
    }

    function UserImage() {
        if (data.data['data'] !== undefined && data.data['allPosts'] !== undefined) {
            return (
                <div> 
                    <div className="UserImageBox">
                        <img className="user_profile_image" alt="profile_image" src={image} />
                        <h1 className="profile_username"> {user_data['username']} </h1>

                </div>

                    <div className="user_profile_posts">

                        {user_data['posts'].map(Element => 
                            <Post data={all_posts[Element]} />
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

