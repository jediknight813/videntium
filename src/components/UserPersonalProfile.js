import React, { useState } from "react";
import { return_current_user_data, upload_file, update_profile_image} from "./firebase";
import { return_profile_image } from "./Header";
import { Link } from 'react-router-dom';
import DisplayPosts from "./DisplayPosts";


var user_posts = ["3nszcxi4ms", "8ueiau1msb", "qe9q15sr5"]

function UserPersonalProfile() {

    const [ButtonUploadClass, updateButtonUploadClass] = useState("HideButtonUpload")

    function update_profile_picture() {
        var uploaded_image = document.getElementById("img")
        uploaded_image.click()
        updateButtonUploadClass("ShowButtonUpload")
    }

    function uploadUserImage() {
        var uploaded_image = document.getElementById("img")
        console.log(uploaded_image)

        if ( uploaded_image.files[0] !== undefined) {


            if ( uploaded_image.files[0]['name'] !== undefined) {
                var file_name = Math.random().toString(36).substring(3,9)
                upload_file(uploaded_image.files[0], file_name)
                update_profile_image(file_name)

            }
        }
    }

    let data = return_current_user_data()


    function UserImage() {
        return (
            <div> 
                <div className="UserImageBox">

                    <input className="upload_image_button" type="file" id="img" name="img" accept="image/*" /> 
                    <button className="profile_image_edit_button" onClick={() => update_profile_picture()}> ✎ </button>
                    <img className="user_profile_image" alt="profile_image" src={return_profile_image()} />
                    <button onClick={() => uploadUserImage()} className={ButtonUploadClass}> upload </button>
                    <h1> {data['username']} </h1>
                </div>


                <DisplayPosts data={data={posts: user_posts, postClass: 'postClass', postBackgroundClass: 'userPostsBox'}} />

                    <Link to="/makeNewPost">
                        <button className="new_post_button" > + </button>
                    </Link>

               

            </div>
        )

    }



    return(
        <div>
            <UserImage />
        </div>
    );
}


export default UserPersonalProfile

