import React from "react";
import { Menu, EditUserForm } from "../components";
import { userIsAuthenticated } from "../HOCs";
import { connect } from "react-redux";

class EditUser extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <h1 style={{ margin: 0, padding: 0, textSize: "large" }}>
          Edit Profile
        </h1>

        <EditUserForm
        profileName = {this.props.match.params.username}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.login.result) {
    return {
      username: state.auth.login.result.username
    };
  } else return {};
};

export default connect(mapStateToProps)(userIsAuthenticated(EditUser));
