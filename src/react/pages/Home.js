import React from "react";
import { LoginForm, Menu, Link } from "../components";
import { userIsNotAuthenticated } from "../HOCs";

class Home extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <LoginForm />
        <Link to="/register" className="buttonSizeLogin">
          Create Account
        </Link>
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
