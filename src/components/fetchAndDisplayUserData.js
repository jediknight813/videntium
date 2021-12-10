import React, {useState, useEffect} from "react";
import UserPublicProfile from "./userPublicProfile";
import { get__public_user_data, get_all_posts_data } from "./firebase";


const FetchAndDisplayUserData = (user_to_display) => {
    const [data, updateData] = useState();
    const [allPosts, setAllPosts] = useState();
    var sending

    useEffect(() => {
      const getData = async () => {
        // eslint-disable-next-line
        const json = await get__public_user_data(user_to_display).then(
            function(value) {
                updateData(value);
                //console.log(value)
            }
        )
        
        // eslint-disable-next-line
        const posts = await get_all_posts_data().then(
            function(value) {
                setAllPosts(value);
                //console.log(value)
            }
        )

      }
      getData();
    }, [user_to_display]);

    // eslint-disable-next-line
    return <UserPublicProfile data={sending={allPosts, data}} />
  }

  export default FetchAndDisplayUserData