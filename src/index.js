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


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
    <Routes>
        <Route path="Login" element={<LoginUser />} />
        <Route path="signUp" element={<SignUpUser />} />
        <Route path="UserPersonalProfile" element={<UserPersonalProfile />} />
        <Route path="makeNewPost" element={<MakeAPost />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);