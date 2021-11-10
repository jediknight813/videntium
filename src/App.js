import loginHeader from "./components/loginHeader";
import React from "react";


var is_user_logged_in = false
var Header = null


function App() {
  if (is_user_logged_in === false) {
      Header = loginHeader
  }
  else {
    Header = <div> </div>
  }


  return (
    <div >
      <Header />
    </div>
  );
}

export default App;
