import React, { useContext } from "react";
import UserContext from "../context/userContext";

function Profile() {
  const currentUser = useContext(UserContext);

  return <h4>Email: {currentUser.email}</h4>;
}

export default Profile;
