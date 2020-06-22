import React, { Component } from "react";
import "./ProfileCard.css";
import { withAsyncAction } from "../HOCs";
import { connect } from "react-redux";

import { Spinner } from ".";

class ProfileCard extends Component {
  componentDidMount() {
    this.props.getUser(this.props.profileName);
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileName !== prevProps.profileName) {
      this.props.getUser(this.props.profileName);
    }
  }

  render() {
    return !this.props.result ? (
      <Spinner />
    ) : (
      <div>
        {this.props.pictureLocation ? (
          <img
            className="user-picture"
            src={`https://drashti-kwitter.herokuapp.com/${this.props.pictureLocation}`}
            alt="user profile"
          />
        ) : (
          <img
            className="user-picture"
            src={
              "https://cdn.pixabay.com/photo/2018/04/22/22/57/hacker-3342696_960_720.jpg"
            }
            alt="user profile"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.users.getUser.result) {
    return {
      username: state.users.getUser.result.user.username,
      pictureLocation: state.users.getUser.result.user.pictureLocation,
      displayName: state.users.getUser.result.user.displayName,
      about: state.users.getUser.result.user.about
    };
  } else return {};
};

export default connect(mapStateToProps)(
  withAsyncAction("users", "getUser")(ProfileCard)
);
