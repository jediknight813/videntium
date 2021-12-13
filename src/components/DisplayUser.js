import React, { useState } from "react";
import { download_post_image } from "./firebase";
import '../styles/profileStyles.css';
import { Link } from 'react-router-dom';



function DisplayUser(data) {
    const [image, setImage] = useState()
    if (data !== undefined && data.data[0] !== undefined) {

    console.log(data.data[0]['username'])

        if (data.data[0]['profile_image'] !== undefined && data.data[0] !== undefined) {
            download_post_image(data.data[0]['profile_image']).then(
                function(value) { 
                    setImage(value)
                }
            );
        }
    }

    if (data.data[0] !== undefined ) {
        return ( 
            <div key={data.data[0]['profile_image']} className="user_post_background">
                <img className="user_image_size" alt={image} src={image} />
                <Link to="/UserPublicProfile">
                    <h1 onClick={() => data.data[1](data.data[0]['username'])} className="post_username">  {data.data[0]['username']} </h1>
                </Link>
            </div>
        )
    }
    else {
        return <div> </div>
    }

}

export default DisplayUser