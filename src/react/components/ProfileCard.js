import React, { Component } from "react";
import "./ProfileCard.css";
import { withAsyncAction } from "../HOCs";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { Link, CreatedAt, Spinner } from "../components";

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
      <div className="pfp-card">
        <div className="user-picture">
          {this.props.pictureLocation ? (
            <img
              className="user-picture"
              src={`https://drashti-kwitter.herokuapp.com${this.props.pictureLocation}`}
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

        <div className="info-box">
          <div className="titleUserName">
            Username:
            <div className="username">{this.props.username}</div>
          </div>
          <div className="titleDisplayName">
            Display Name:
            <div className="displayName">{this.props.displayName}</div>
          </div>
          <div className="titleTime">
            Joined:
            <div className="displayTime">
              {" "}
              <CreatedAt />
            </div>
          </div>
          <div className="bio">
            {this.props.about ? (
              this.props.about
            ) : (
              <p>"No bio provided by this user"</p>
            )}
          </div>
          <div className="profileButtons">
            {this.props.username === this.props.loggedIn && (
              <Link to={`/edit+profile/${this.props.username}`}>
                <Button id="editProfileButton">Edit profile</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.users.getUser.result) {
    return {
      loggedIn: state.auth.login.result.username,
      username: state.users.getUser.result.user.username,
      pictureLocation: state.users.getUser.result.user.pictureLocation,
      displayName: state.users.getUser.result.user.displayName,
      about: state.users.getUser.result.user.about,
      googleId: state.users.getUser.result.user.googleId,
      createdAt: state.users.getUser.result.user.createdAt,
      updatedAt: state.users.getUser.result.user.updatedAt
    };
  } else return {};
};

export default connect(mapStateToProps)(
  withAsyncAction("users", "getUser")(ProfileCard)
);