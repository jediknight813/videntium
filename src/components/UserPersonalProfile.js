import React, { useState, useEffect } from "react";
import { return_current_user_data, upload_file, update_profile_image, check_if_user_is_logged_on, get__public_user_data} from "./firebase";
import { return_profile_image } from "./Header";
import { Link } from 'react-router-dom';
import DisplayUser from "./DisplayUser";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

var user_posts = []

function UserPersonalProfile (Data) {
    var user_data = undefined
    var all_posts = undefined
    //console.log(Data)

    const navigate = useNavigate();
    var check = check_if_user_is_logged_on()
    if (check === false) {
        navigate('/')
    }

    if (Data.data['data'] !== undefined && Data.data['allPosts'] !== undefined) {
        all_posts = Data.data['allPosts']
        user_data = Data.data['data']
        var func = Data.data['user_to_display'].data[1]
    }


    const [ButtonUploadClass, updateButtonUploadClass] = useState("HideButtonUpload")

    function update_profile_picture() {
        var uploaded_image = document.getElementById("img")
        uploaded_image.click()
        updateButtonUploadClass("ShowButtonUpload")
    }

    function uploadUserImage() {
        console.log("here for some reason")
        var uploaded_image = document.getElementById("img")
        console.log(uploaded_image)
        if (uploaded_image !== undefined && uploaded_image !== null) {
            if ( uploaded_image.files[0] !== undefined && uploaded_image.files[0] !== null) {
                uploaded_image = document.getElementById("img")
                var file_name = Math.random().toString(36).substring(3,9)
                upload_file(uploaded_image.files[0], file_name)
                update_profile_image(file_name)
                navigate("/UserPersonalProfile")
            }
        }
    }

    let user = return_current_user_data()
    var data


    function UserImage() {
        if (Data.data['allUsers'] !== undefined && Data.data['user_to_display'].data[1] !== undefined && user !== undefined && Data.data['allPosts'] !== undefined ) {
            
            if (Array.isArray(user['followers']) === false) {
                user['followers'] = []
            }

            if (Array.isArray(user['following']) === false) {
                user['following'] = []
            }

            if (Array.isArray(user['posts']) === false) {
                user['posts'] = []
            }

            user['following'].reverse();
            user['followers'].reverse();
            user['posts'].reverse();


            function arrayRemove(arr, value) { 
    
                return arr.filter(function(ele){ 
                    return ele !== value; 
                });
            }

            user['following'] = arrayRemove(user['following'], "");
            user['followers'] = arrayRemove(user['followers'], "");

            
            return (
                <div> 
                    <div className="UserImageBox">

                        <input onChange={() => uploadUserImage()} className="upload_image_button" type="file" id="img" name="img" accept="image/*" /> 
                        <img id="user_image" className="user_profile_image" alt="profile_image" src={return_profile_image()} />
                        <h1 className="profile_username"> {user['username']} </h1>

                    </div>


                    <h1 style={{top: "32%", position: "absolute", left: "47.2%", color: "tomato"}}> Posts </h1>
                    <div className="user_profile_posts">

                        {user['posts'].map(Element => 
                            <Post data={[ Data.data['allPosts'][Element], func]} />
                        )}        

                    </div>
                        <Link to="/makeNewPost">
                            <button className="new_post_button" > + </button>
                        </Link>

                        <h1 style={{top: "83%", position: "absolute", left: "46%", color: "tomato"}}> Followers </h1>
                        <div className="user_followers">

                            {user['followers'].map(Element => 
                                <DisplayUser data={[ Data.data['allUsers'][Element], func]} />
                            )}        

                        </div>


                        <h1 style={{top: "113%", position: "absolute", left: "46%", color: "tomato"}}> Following </h1>
                        <div className="user_following">

                            {user['following'].map(Element => 
                                <DisplayUser data={[ Data.data['allUsers'][Element], func]} />
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

    return(
        <div>
            <UserImage />
        </div>
    );
}

// <button onClick={() => uploadUserImage()} className={ButtonUploadClass}> upload </button>
// <button className="profile_image_edit_button" onClick={() => update_profile_picture()}> ✎ </button>

export default UserPersonalProfile

