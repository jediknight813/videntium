import React from "react";
import Post from "./Post";
import '../styles/profileStyles.css';


function FrontPage(data){
    console.log(data)
    var all_posts = []

    if (data.data !== undefined) {
        console.log(data.data['all_posts'])
        for (var i in data.data['all_posts']) {
            all_posts.push(i)
        }
    }

    if (data.data !== undefined && all_posts.length > 2) {
        return (
            <div className="front_page_posts">

                {all_posts.map(Element => 

                <Post data={ [ data.data['all_posts'][Element], data.data['func'].data ] } />
                )}         

        </div>
        )
    
    }
    else {
        return (
            <div> </div>
        )
    }
}


export default FrontPage