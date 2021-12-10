import React, { useState } from "react";
import { download_post_image } from "./firebase";
import '../styles/profileStyles.css';
import { Link } from 'react-router-dom';


function Post(data) {
    //console.log(data.data[1])
    const [image, setImage] = useState()
    if (data !== undefined && data.data[0] !== undefined) {

        //console.log(data)

        if (data.data[0]['image_name'] !== undefined && data.data[0] !== undefined) {
            download_post_image(data.data[0]['image_name']).then(
                function(value) { 
                    setImage(value)
                }
            );
        }
    }

    return ( 
        <div key={data.data[0]['image_name']} className="post_background">
            <img className="image_size" alt={image} src={image} />
            <h1 className="post_title"> {data.data[0]['title']} </h1>

            <Link to="/UserPublicProfile">
                <h1 onClick={() => data.data[1](data.data[0]['username'])} className="post_username">  {data.data[0]['username']} </h1>
            </Link>

            <h1 className="post_description"> {data.data[0]['description']} </h1>
        </div>
    )

}

export default Post