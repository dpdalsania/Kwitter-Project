import React from "react";
import { withAsyncAction } from "../HOCs";
import { connect } from "react-redux";

class LikeMessage extends React.Component {
  likeMessage = event => {
    event.preventDefault();
    this.props.likeMessage(
      { messageId: this.props.messageId },
      this.props.token,
      this.props.requestTag
    );
  };

  render() {
    return <button onClick={this.likeMessage}>Like This Message!</button>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.login.result.token
  };
};

export default connect(mapStateToProps)(
  withAsyncAction("likes", "likeMessage")(LikeMessage)
);
