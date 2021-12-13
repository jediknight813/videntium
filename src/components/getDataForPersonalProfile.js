import React, { useState, useEffect } from "react";
import UserPersonalProfile from "./UserPersonalProfile";
import { get__public_user_data, get_all_posts_data, get_all_users_data } from "./firebase";



const GetDataForPersonalProfile = (user_to_display) => {
    var name = user_to_display.data[0]
    const [data, updateData] = useState();
    const [allPosts, setAllPosts] = useState();
    const [allUsers, SetAllUsers] = useState();

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

        const users = await get_all_users_data().then(
          function(value) {
              SetAllUsers(value);
              //console.log(value)
          }
      )

      }
      getData();
    }, [user_to_display]);


    return <UserPersonalProfile data={sending={allPosts, data, user_to_display, allUsers}} />
  }


  export default GetDataForPersonalProfile