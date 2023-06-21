import React from "react";
//import Navbar from "./Navbar"
import Search from "./search.js"
//import Chats from "./Chats"

function Sidebar( {auth} ) {
  return (
    <div className="sidebar">
      <p>sidebar</p>
	  <Search/ >
    </div>
  );
};

export default Sidebar;
