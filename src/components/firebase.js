import { initializeApp } from "firebase/app";
// eslint-disable-next-line
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import DefaultProfileImage from '../images/DefaultProfileImage.png'


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



function Logout_user_in_firebase() {
  is_user_logged_on = false
  current_user = ''
}

function writeUserData(username, password) {
  const db = getDatabase();
  is_user_logged_on = true
  set(ref(db, 'users/' +  username), {
    username: username,
    password: password,
    followers: [],
    boards: [],
    following: [],
    posts: [],
    profile_image: DefaultProfileImage

  });
}


function update_user_profile_image(image) {
  const db = getDatabase();
  update(ref(db, 'users/' +  current_user['username']), {
    profile_image: image,
  });
}



function return_current_user_data() {
  return current_user
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


export { get_user_data, writeUserData, check_password, check_if_user_is_logged_on, return_current_user_data, Logout_user_in_firebase, check_if_username_is_taken, update_user_profile_image}