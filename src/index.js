import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import LoginUser from "./components/login";
import SignUpUser from "./components/signUpUser";
import UserPersonalProfile from "./components/UserPersonalProfile";
import MakeAPost from "./components/MakeAPost";
import FetchAndDisplayUserData from "./components/fetchAndDisplayUserData"
import GetAndDisplayFrontPageData from "./components/GetAndDisplayFrontPageData";
import { get_current_user } from "./components/userPublicProfile";
import { useState } from "react";



function Main() {
  const [public_user, setPublicUser] = useState()
  
  function change_public_user(name) {
    setPublicUser(name)
    console.log("here")
  }


  return (
    <BrowserRouter>
      <App />
      <Routes>
          <Route path="" element={<GetAndDisplayFrontPageData data={change_public_user} />} />
          <Route path="Login" element={<LoginUser />} />
          <Route path="signUp" element={<SignUpUser />} />
          <Route path="UserPersonalProfile" element={<UserPersonalProfile />} />
          <Route path="makeNewPost" element={<MakeAPost />} />
          <Route path="UserPublicProfile" element={<FetchAndDisplayUserData data={public_user} />} />
      </Routes>
    </BrowserRouter>
  )

}


render(<Main/>, window.document.getElementById("root") )