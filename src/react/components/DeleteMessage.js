import React from "react";
import { withAsyncAction } from "../HOCs";
import { connect } from "react-redux";

class DeleteMessage extends React.Component {
  handleDeleteMessage = event => {
    console.log(this.props)
    const confirmed = window.confirm(
      "Are you sure you want to delete your message?"
    );
    if (confirmed) {
      this.props.deleteMessage(
        this.props.messageId,
        this.props.token,
        this.props.requestTag
      );
    }
  };

  render() {
    return <button onClick={this.handleDeleteMessage}>Delete</button>;
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.login.result.token
  };
};

export default connect(mapStateToProps)(
  withAsyncAction("messages", "deleteMessage")(DeleteMessage)
);
