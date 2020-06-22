import React from "react";
import { Menu, CreateUser, Link } from "../components";
import { userIsNotAuthenticated } from "../HOCs";

class Register extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <CreateUser />
        <h4>
          <Link to="/">Go Back Home</Link>
        </h4>
      </>
    );
  }
}

export default userIsNotAuthenticated(Register);
