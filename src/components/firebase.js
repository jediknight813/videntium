import { initializeApp } from "firebase/app";
// eslint-disable-next-line
import { getDatabase, ref, set, onValue, update } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD1YY7MEswEl5aob1fLrF_3YRff_SeOF1U",
  authDomain: "pinterest-clone-5a220.firebaseapp.com",
  databaseURL: "https://pinterest-clone-5a220-default-rtdb.firebaseio.com",
  projectId: "pinterest-clone-5a220",
  storageBucket: "pinterest-clone-5a220.appspot.com",
  messagingSenderId: "734695834748",
  appId: "1:734695834748:web:5cfad6cda8b3ad600cf5f9"
};




function writeUserData() {
    const db = getDatabase();
    set(ref(db, 'users/'), {
      username: "test",
    });
  }



// eslint-disable-next-line
const app = initializeApp(firebaseConfig);


export default writeUserData