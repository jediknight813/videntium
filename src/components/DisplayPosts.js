import React, { useState } from "react";
import {return_all_post_data, return_current_user_data, return_all_posts } from "./firebase";
import '../styles/profileStyles.css';
import Post from "./Post";


var all_posts = []


function DisplayPosts(data) {
    return_all_posts()
    let current_user_data  = return_current_user_data()
    all_posts = return_all_post_data()


   // const [count, setCount] = useState(0);
    //setTimeout(() => {
    //    setCount(count + 1)
    //  }, 1000);


    if (current_user_data['posts'] !== "x" && all_posts !== []) {
        return (
            <div className="user_profile_posts">
    
                 {current_user_data['posts'].map(Element => 
                 
                    <Post data={all_posts[Element]} />
                 
                 )}
    
    
            </div>
        )
    }
    else {
        return (
            <div>
                no posts
            </div>
        )
    }

    
}

export default DisplayPosts

