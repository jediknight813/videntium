import React, { useState } from "react";
import '../styles/headerStyles.css';
import { addPostToUser, makeNewPost, upload_file } from "./firebase";
import {useNavigate} from 'react-router-dom';


function MakeAPost() {
    const [title, SetTitle] = useState('')
    const [description, SetDescription] = useState('')
    const navigate = useNavigate();


    function submitPost() {
        var file_name = Math.random().toString(36).substring(3,20)
        var image_name = Math.random().toString(30).substring(3,24)

        var uploaded_image = document.getElementById("image")
        if ( title !== '' & description !== '' & uploaded_image !== '') {
            upload_file(uploaded_image.files[0], image_name)
            addPostToUser(file_name)
            makeNewPost(title, image_name, description, file_name)
            navigate('/UserPersonalProfile')
        }
    }


    return (
        <div> 


            <div className="new_post_background"> 
            
            <input type="text" onChange={event => SetTitle(event.target.value)} placeholder="title" /> 

            <input type="text" onChange={event => SetDescription(event.target.value)} placeholder="description" /> 

            <input type="file" id="image" accept="image/*" />

            <button onClick={() => submitPost()}> submit </button>


            </div>
            
        
        </div>
    );
}


export default MakeAPost