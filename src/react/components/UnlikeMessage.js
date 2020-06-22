import React from "react";
import { withAsyncAction } from "../HOCs";
import { connect } from "react-redux";

class UnlikeMessage extends React.Component {
  unlikeMessage = event => {
    event.preventDefault();
    this.props.likes.forEach(like => {
      if (like.username === this.props.username) {
        this.props.unlikeMessage(
          like.id,
          this.props.token,
          this.props.requestTag
        );
      }
    });
  };

  render() {
    return <button onClick={this.unlikeMessage}>Unlike This Message!</button>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.login.result.token,
    username: state.auth.login.result.username
  };
};

export default connect(mapStateToProps)(
  withAsyncAction("likes", "unlikeMessage")(UnlikeMessage)
);
