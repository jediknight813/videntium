import React, { useState } from "react";
import { download_post_image } from "./firebase";
import '../styles/profileStyles.css';


function Post(data) {
    const [image, setImage] = useState()

    if (data.data['image_name'] !== undefined && data.data !== undefined && data !== undefined) {
        download_post_image(data.data['image_name']).then(
            function(value) { 
                setImage(value)
             }
          );
    }

    return ( 
        <div className="post_background">
            <img className="image_size" alt={image} src={image} />
            <h1 className="post_title"> {data.data['title']} </h1>
            <h1 className="post_username">  {data.data['username']} </h1>
            <h1 className="post_description"> {data.data['description']} </h1>
        </div>
    )

}

export default Post