import React, { useState } from "react";
import { return_current_user_data, update_user_profile_image } from "./firebase";




function UserPersonalProfile() {

    const [ButtonUploadClass, updateButtonUploadClass] = useState("HideButtonUpload")

    function update_profile_picture() {
        var uploaded_image = document.getElementById("img")
        uploaded_image.click()
        updateButtonUploadClass("ShowButtonUpload")
    }

    function uploadUserImage() {
        var uploaded_image = document.getElementById("img")
        update_user_profile_image(uploaded_image.files[0])
    }

    let data = return_current_user_data()


    function UserImage() {
        return (
            <div className="UserImageBox">

                <input className="upload_image_button" type="file" id="img" name="img" accept="image/*" /> 
                <button className="profile_image_edit_button" onClick={() => update_profile_picture()}> ✎ </button>
                <img className="user_profile_image" alt="profile_image" src={data['profile_image']} />
                <button onClick={() => uploadUserImage()} className={ButtonUploadClass}> upload </button>
                <h1> {data['username']} </h1>
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

