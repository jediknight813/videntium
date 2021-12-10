import React, { useState, useEffect } from "react";
import { get_all_posts_data } from "./firebase";
import FrontPage from "./FrontPage";


const GetAndDisplayFrontPageData = (data) => {
    const [allPosts, setAllPosts] = useState();

    useEffect(() => {
      const getData = async () => {
          
        // eslint-disable-next-line
        const posts = await get_all_posts_data().then(
            function(value) {
                setAllPosts(value);
            }
        )

      }
      getData();
    }, []);
  
    return <FrontPage data={data={"all_posts": allPosts, "func": data}} />
  }

  export default GetAndDisplayFrontPageData