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
import { useState } from "react";
import GetDataForPersonalProfile from "./components/getDataForPersonalProfile";


function Main() {
  const [public_user, setPublicUser] = useState()
  
  function change_public_user(name) {
    setPublicUser(name)
    //console.log(name)
  }


  return (
    <BrowserRouter>
      <App data={change_public_user} />
      <Routes>
          <Route path="videntium" element={<GetAndDisplayFrontPageData data={change_public_user} />} />
          <Route path="frontPage" element={<GetAndDisplayFrontPageData data={change_public_user} />} />
          <Route path="Login" element={<LoginUser />} />
          <Route path="signUp" element={<SignUpUser />} />
          <Route path="UserPersonalProfile" element={<GetDataForPersonalProfile data={[public_user, change_public_user]}  />} />
          <Route path="makeNewPost" element={<MakeAPost />} />
          <Route path="UserPublicProfile" element={<FetchAndDisplayUserData data={[public_user, change_public_user]} />} />
      </Routes>
    </BrowserRouter>
  )

}


render(<Main/>, window.document.getElementById("root") )