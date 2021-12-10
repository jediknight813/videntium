import { initializeApp } from "firebase/app";
import { getDatabase, set, onValue, update, ref, get, child} from "firebase/database";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { profile_image } from "./Header";


var current_user = ''

var is_user_logged_on = false


const firebaseConfig = {
  apiKey: "AIzaSyD1YY7MEswEl5aob1fLrF_3YRff_SeOF1U",
  authDomain: "pinterest-clone-5a220.firebaseapp.com",
  databaseURL: "https://pinterest-clone-5a220-default-rtdb.firebaseio.com",
  projectId: "pinterest-clone-5a220",
  storageBucket: "pinterest-clone-5a220.appspot.com",
  messagingSenderId: "734695834748",
  appId: "1:734695834748:web:5cfad6cda8b3ad600cf5f9"
};


// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



function download_image(image_name) {
  getDownloadURL(sRef(storage, image_name))
  .then((url) => {
    profile_image(url)
  })
}


async function download_post_image(image_name) {
  let response = await getDownloadURL(sRef(storage, image_name))
  return response;

}


async function get__public_user_data(username) {  
    const dbRef = ref(getDatabase());
    var response = await get(child(dbRef, 'users/' + username)).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        return snapshot.val()

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  return response
  }



  async function get_all_posts_data() {  
    const dbRef = ref(getDatabase());
    var response = await get(child(dbRef, 'posts/' )).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        return snapshot.val()

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  return response
  }



function upload_file(file, file_name) {

  const storageRef = sRef(storage, file_name);

  uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
}


function update_profile_image(file_name) {
  const db = getDatabase();
  is_user_logged_on = true
  update(ref(db, 'users/' +  current_user['username']), {
    profile_image: file_name
  });
}


function Logout_user_in_firebase() {
  is_user_logged_on = false
  current_user = ''
}




function following_user(following_name) {
  const db = getDatabase();
  is_user_logged_on = true
  let post_list = []
  let x = current_user['following']

  if (Array.isArray(x) === false) {
    post_list.push(following_name)
  }
  else {
    post_list = []
    x.forEach((element) => { post_list.push(element) } )
    post_list.push(following_name)
    //if (post_list[0] === ""){
    //  post_list.shift()
    //}

  }
  update(ref(db, 'users/' +  current_user['username']), {
      following: post_list
  });
} 


function Unfollow_user(following_name) {
  const db = getDatabase();
  is_user_logged_on = true
  let post_list = []
  let x = current_user['following']

  if (Array.isArray(x) === false) {
    post_list.push(following_name)
  }
  else {
    post_list = []
    x.forEach((element) => { post_list.push(element) } )
    post_list.push(following_name)
    post_list = post_list.filter(val => val !== following_name);
    //console.log(post_list)

  }
  update(ref(db, 'users/' +  current_user['username']), {
      following: post_list
  });
} 




function add_follower(following_data) {
  console.log("here, adding follower")
  const db = getDatabase();
  is_user_logged_on = true
  let post_list = []
  let x = following_data['followers']

  if (Array.isArray(x) === false) {
    post_list.push(current_user['username'])
  }
  else {
    post_list = []
    x.forEach((element) => { post_list.push(element) } )
    post_list.push(current_user['username'])
  }
  update(ref(db, 'users/' +  following_data['username']), {
      followers: post_list
  });
} 


function remove_follower(following_data) {
  const db = getDatabase();
  is_user_logged_on = true
  let post_list = []
  let x = current_user['followers']

  if (Array.isArray(x) === false) {
    post_list.push(current_user['username'])
  }
  else {
    post_list = []
    x.forEach((element) => { post_list.push(element) } )
    post_list.push(current_user['username'])
    post_list = post_list.filter(val => val !== current_user['username']);
    //console.log(post_list)

  }
  update(ref(db, 'users/' +  following_data['username']), {
      followers: post_list
  });
} 



function addPostToUser(file_name) {
  const db = getDatabase();
  is_user_logged_on = true
  let post_list = []
  let x = current_user['posts']

  if (Array.isArray(x) === false) {
    post_list.push(file_name)
    console.log("not a list")
    console.log(current_user['posts'])
  }
  else {
    post_list = []
    x.forEach((element) => { post_list.push(element) } )
    post_list.push(file_name)
  }
  update(ref(db, 'users/' +  current_user['username']), {
      posts: post_list
  });
} 





function makeNewPost(title, image_name, description, file_name) {
  const db = getDatabase();
  is_user_logged_on = true
  set(ref(db, 'posts/' +  file_name), {
    title: title,
    description: description,
    image_name: image_name,
    username: current_user['username']
  });
} 




function writeUserData(username, password) {
  const db = getDatabase();
  is_user_logged_on = true
  set(ref(db, 'users/' +  username), {
    username: username,
    password: password,
    followers: [''],
    boards: [''],
    following: [''],
    posts: "x",
    profile_image: "default_profile_image.png"

  });
} 


function return_current_user_data() {
  return current_user
}


var all_posts = []

function return_all_posts() {
  let db = getDatabase();
  let getPosts = ref(db, 'posts/');
  onValue(getPosts, (snapshot) => {
    let data = snapshot.val();
    all_posts = data
  });
}


function return_all_post_data() {
  return all_posts
}


function return_current_user_posts() {
  let db = getDatabase();
  let getPosts = ref(db, + "users/" + current_user['username'] + '/posts/');
  onValue(getPosts, (snapshot) => {
    let data = snapshot.val();
    console.log(data)
    return data
  });
}






function check_if_user_is_logged_on() {
  if (is_user_logged_on === true) {
    return true
  }
  else {
    return false
  }
}


function check_password(password) {
  if (current_user != null) {
    if (current_user['password'] === password) {
      is_user_logged_on = true
      return true
    }
    else {
      return false
    }
  }

  else  {
    return false
  }
}

var user_data = ''


function check_if_username_is_taken(username) {
  user_data = undefined
  const db = getDatabase();
  const getUsers = ref(db, 'users/' + username);
  onValue(getUsers, (snapshot) => {
    const data = snapshot.val();
    user_data  = data
});
      if (user_data === null) {
        return false
      }
      else {
        if (user_data === undefined) {
          return false
        }
        else {
          return true
        }
      }
}

function get_user_data(username) {
  const db = getDatabase();
  const getUsers = ref(db, 'users/' + username);
  onValue(getUsers, (snapshot) => {
    const data = snapshot.val();
    current_user = data
  });
}


export {remove_follower, add_follower, Unfollow_user, following_user, get_all_posts_data, get__public_user_data, download_post_image, return_all_post_data, return_current_user_posts, return_all_posts, addPostToUser, makeNewPost, update_profile_image, download_image, get_user_data, writeUserData, check_password, check_if_user_is_logged_on, return_current_user_data, Logout_user_in_firebase, check_if_username_is_taken, upload_file}