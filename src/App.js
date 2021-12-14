import loginHeader from "./components/Header";
import React from "react";


var is_user_logged_in = false
var Header = null


function App(Data) {
  if (is_user_logged_in === false) {
      Header = loginHeader
  }
  else {
    Header = <div> </div>
  }


  return (
    <div >
      <Header data={Data} />
    </div>
  );
}

export default App;
