import React from "react";
import { Menu, ProfileCard, NewMessageBox, MessageList} from "../components";
import { userIsAuthenticated } from "../HOCs";
import "./Profile.css";
import { connect } from "react-redux";

class Profile extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="leftBox">
          <Menu
            isAuthenticated={this.props.isAuthenticated}
            username={this.props.match.params.username}
          />
          {this.props.username === this.props.match.params.username && (
            <div>
              <h3>Create New Kweet Below...</h3>
              <NewMessageBox
                requestTag={`?limit=30&offset=0&username=${this.props.match.params.username}`}
              />
            </div>
          )}
        </div>
        <div className="rightBox">
          <div className="profileCard">
            <ProfileCard profileName={this.props.match.params.username}/>
          </div>
          <div className="profileMessageList">
            <MessageList
              requestTag={`?limit=30&offset=0&username=${this.props.match.params.username}`}
            />
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps)(userIsAuthenticated(Profile));
