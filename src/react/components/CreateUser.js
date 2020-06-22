import React from "react";
import { withAsyncAction } from "../HOCs";
import "./CreateUser.css";
import { Input, Button } from "semantic-ui-react";
import { Spinner } from ".";

class CreateUser extends React.Component {
  state = {
    username: "",
    password: "",
    displayName: "",
    error: false
  };

  handleCreateUser = e => {
    e.preventDefault();

    this.props.createUser({
      username: this.state.username,
      password: this.state.password,
      displayName: this.state.displayName
    });
  };

  // validate = () => {
  //   const { username, password, displayName } = this.state;
  //   if (username.trim().length < 3 || username.trim().length > 20) {
  //     return false;
  //   } else if (password.trim().length < 3 || password.trim().length > 20) {
  //     return false;
  //   } else if (
  //     displayName.trim().length < 3 ||
  //     displayName.trim().length > 20
  //   ) {
  //     return false;
  //   } else return true;
  // };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value.trim().length < 3 || e.target.value.trim().length > 20) {
      e.target.style.color = "red";
    } else {
      e.target.style.color = "gray";
    }
  };

  render() {
    const { loading, error } = this.props;

    return (
      <React.Fragment>
        <form id="register-form" onSubmit={this.handleCreateUser}>
          <h1>Register</h1>
          <div>
            <Input
              size="huge"
              label="Username"
              type="text"
              name="username"
              placeholder="3-20 characters"
              autoFocus
              required
              onChange={this.handleChange}
            />
          </div>
          <Input
            size="huge"
            label="Password"
            type="password"
            name="password"
            placeholder="3-20 characters"
            onChange={this.handleChange}
            required
          />
          <Input
            size="huge"
            label="Display Name"
            type="text"
            name="displayName"
            placeholder="3-20 characters"
            required
            onChange={this.handleChange}
          />
          <Button
            style={{ color: "#5A4576", marginTop: "1px" }}
            size="huge"
            type="submit"
            disabled={loading}
          >
            Register
          </Button>
        </form>
        {error && (
          <p style={{ marginTop: "10px", color: "red", fontSize: "20px" }}>
            {error.message}
          </p>
        )}
        {loading && <Spinner name="circle" color="blue" />}
      </React.Fragment>
    );
  }
}

export default withAsyncAction("users", "createUser")(CreateUser);
