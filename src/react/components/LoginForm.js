import React from "react";
import { Spinner } from ".";
import { withAsyncAction } from "../HOCs";
import "./LoginForm.css";
import { Input, Button } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div id="formStyle">
        <React.Fragment>
          <form id="login-form" onSubmit={this.handleLogin}>
          
            <Input
              size="huge"
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your Name"
              autoFocus
              required
              onChange={this.handleChange}
            />

            <Input
              size="huge"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={this.handleChange}
            />

            <Button
              style={{ color: "#5A4576", marginTop: "4px" }}
              size="huge"
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
            
            {error && (
              <p style={{ marginTop: "10px", color: "red", fontSize: "20px" }}>
                {error.message}
              </p>
            )}
           
          </form>
          {loading && <Spinner name="circle" color="blue" />}
        </React.Fragment>
        </div>
    );
  }
}

export default withAsyncAction("auth", "login")(LoginForm);
