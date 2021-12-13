import React, { useState } from "react";
import '../styles/headerStyles.css';
import { addPostToUser, makeNewPost, upload_file, check_if_user_is_logged_on } from "./firebase";
import {useNavigate} from 'react-router-dom';


function MakeAPost() {
    const [title, SetTitle] = useState('')
    const [description, SetDescription] = useState('')

    const [file, setFile] = React.useState(null)
        
    const fileHandler = (e) => {
        setFile(e.target.files[0])
    }


    const navigate = useNavigate();
    var check = check_if_user_is_logged_on()
    if (check === false) {
        navigate('/')
    }


    function submitPost() {
        var file_name = Math.random().toString(36).substring(3,20)
        var image_name = Math.random().toString(30).substring(3,24)

        var uploaded_image = document.getElementById("image")
        if ( title !== '' & description !== '' & uploaded_image !== '') {
            upload_file(uploaded_image.files[0], image_name)
            addPostToUser(file_name)
            makeNewPost(title, image_name, description, file_name)
            navigate('/')
        }
    }


    return (
        <div> 
            <h1 style={{position: "absolute", color: "tomato", right: "47%", top:"13% "}}> create post </h1>
            <div className="new_post_background"> 

                <img id="myimage" className="new_post_image" src={file? URL.createObjectURL(file) : null} alt={file? file.name : null}/>

                <input className="create_post_title_input" type="text" onChange={event => SetTitle(event.target.value)} placeholder="title" /> 

                <input className="create_post_disc_input" type="text" onChange={event => SetDescription(event.target.value)} placeholder="description" /> 

                <input onChange={fileHandler} className="custom-file-input" type="file" id="image" accept="image/*" />

                <button className="submit_post" onClick={() => submitPost()}> post </button>


            </div>
            
        </div>
    );
}


export default MakeAPost