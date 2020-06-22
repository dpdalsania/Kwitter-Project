import React from "react";
import { Menu, NewMessageBox, MessageList } from "../components";
import { userIsAuthenticated } from "../HOCs";
import "./MessageFeed.css";

class MessageFeed extends React.Component {
  render() {
    return (
      <>
        <div className="page">
          <div className="leftBox">
            <Menu isAuthenticated={this.props.isAuthenticated} />
            <h3>Create New Kweet Below...</h3>
            <NewMessageBox requestTag="?limit=30" />
          </div>
          <div className="rightBox">
            <MessageList requestTag="?limit=30" />
          </div>
        </div>
      </>
    );
  }
}

export default userIsAuthenticated(MessageFeed);
