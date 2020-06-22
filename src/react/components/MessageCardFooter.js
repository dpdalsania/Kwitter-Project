import React from "react";
import { DeleteMessage } from "../components";
import LikeMessage from "./LikeMessage";
import UnlikeMessage from "./UnlikeMessage";

class MessageCardFooter extends React.Component {
  shouldDisplayDeleteButton = () => {
    if (JSON.parse(localStorage.login).result.username === this.props.author) {
      return true;
    }
    return false;
  };

  checkIfMessageIsLiked = () => {
    const username = JSON.parse(localStorage.login).result.username;
    let usersWhoLike = this.props.likes.map(like => {
      return like.username;
    });
    if (usersWhoLike.includes(username)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="messageFooter">
        {this.checkIfMessageIsLiked() === false ? (
          <LikeMessage
            messageId={this.props.id}
            requestTag={this.props.requestTag}
          />
        ) : (
          <UnlikeMessage
            likes={this.props.likes}
            requestTag={this.props.requestTag}
          />
        )}
        <div>{this.props.likes.length} Likes</div>
        {this.shouldDisplayDeleteButton() === true ? (
          <DeleteMessage
            messageId={this.props.id}
            requestTag={this.props.requestTag}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MessageCardFooter;
