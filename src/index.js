import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import LoginUser from "./components/login";
import SignUpUser from "./components/signUpUser";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
    <Routes>
        <Route path="Login" element={<LoginUser />} />
        <Route path="signUp" element={<SignUpUser />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);