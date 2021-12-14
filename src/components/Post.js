import React, { useEffect, useState } from "react";
import { download_post_image, save_post_to_user, unsave_post_to_user, return_current_user_data } from "./firebase";
import '../styles/profileStyles.css';
import { Link } from 'react-router-dom';

var post_update = false

function Post(data) {
    const [saveButtonText, setSaveButtonText] = useState("save")
    const [image, setImage] = useState()
    var is_saved = "save"
    var user_data = return_current_user_data()
    useEffect(() => setSaveButtonText(is_saved), [is_saved]);
    if (data !== undefined && data.data[0] !== undefined) {

        //console.log(data.data[2])
        //console.log(user_data)
        if (user_data !== undefined && user_data !== null && user_data !== "") {
            if (user_data['saved_posts'].includes(data.data[2]) && post_update === false) {
                is_saved = "saved"
            }
        }


        if (data.data[0]['image_name'] !== undefined && data.data[0] !== undefined) {
            download_post_image(data.data[0]['image_name']).then(
                function(value) { 
                    setImage(value)
                }
            );
        }
    }



    function save_or_unsave_post() {
        console.log(data.data[0])
        if (saveButtonText === "saved") {
            setSaveButtonText("save")
            unsave_post_to_user(data.data[2])

        }

        else {
            setSaveButtonText("saved")
            save_post_to_user(data.data[2])
        }

    }


    if (data.data[0] !== undefined) {
    return ( 
        <div key={data.data[0]['image_name']} className="post_background">
            <img className="image_size" alt={image} src={image} />
            <h1 className="post_title"> {data.data[0]['title']} </h1>
            <button onClick={() => save_or_unsave_post()} className="save_button"> {saveButtonText} </button>
            <Link to="/UserPublicProfile">
                <h1 onClick={() => data.data[1](data.data[0]['username'])} className="post_username">  {data.data[0]['username']} </h1>
            </Link>

            <h1 className="post_description"> {data.data[0]['description']} </h1>
        </div>
    )
    }
    else {
        return <div> </div>
    }

}

export default Post