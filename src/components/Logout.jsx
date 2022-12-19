import { useEffect } from "react";
import auth from "./../services/authService";
import Loading from "../common/Loading";

function Logout() {
  useEffect(() => {
    auth.logout();

    window.location = "/";
  }, []);

  return <Loading label="Redirecting..." />;
}

export default Logout;
