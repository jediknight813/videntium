import React from "react";
import { return_all_posts } from "./firebase";


var all_posts = []

function return_posts(data) {
    const returned_data = Object.keys(data).map(key => (key = [ data[key] ] ));
    all_posts = returned_data
    console.log(all_posts)
}


function DisplayPosts(data) {
    return_all_posts()

    //console.log(data['data']['posts'])
    //console.log(data['data']['postClass'])
    //console.log(data['data']['postBackgroundClass'])


    return (
        <div className={data['data']['postBackgroundClass']}>

             {data['data']['posts'].map(items => (
                <div className={data['data']['postClass']}>
       
                    <h1 className="item_text">
                        {all_posts[items]}
                    </h1> 


                </div>  
            ))}


        </div>
    )
    
}


export { return_posts }

export default DisplayPosts

