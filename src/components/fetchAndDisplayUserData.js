import React, {useState, useEffect} from "react";
import UserPublicProfile from "./userPublicProfile";
import { get__public_user_data, get_all_posts_data } from "./firebase";


const FetchAndDisplayUserData = (user_to_display) => {
    var name = user_to_display.data[0]
    //console.log(name)
    const [data, updateData] = useState();
    const [allPosts, setAllPosts] = useState();
    var sending

    useEffect(() => {
      const getData = async () => {

        const json = await get__public_user_data(name).then(
            function(value) {
                updateData(value);
                //console.log(value)
            }
        )
        

        const posts = await get_all_posts_data().then(
            function(value) {
                setAllPosts(value);
                //console.log(value)
            }
        )

      }
      getData();
    }, [user_to_display]);


    return <UserPublicProfile data={sending={allPosts, data, user_to_display}} />
  }

  export default FetchAndDisplayUserData