import React from "react";
import { withAsyncAction } from "../HOCs";
import { Spinner } from ".";
import "./NewMessage.css";

class NewMessageBox extends React.Component {
  state = {
    value: ""
  };

  keyPress = event => {
    if (
      event.target.value.trim().length < 2 ||
      event.target.value.trim().length > 255
    ) {
      event.target.style.color = "red";
    } else {
      event.target.style.color = "gray";
    }

    if (event.keyCode === 13) {
      if (this.state.value.length > 2 && this.state.value.length < 256) {
        this.postMessageByEnter();
        this.setState({ value: "" });
      }
    } else {
      this.setState({ value: event.target.value });
    }
  };

  //
  //Thanks to https://stackoverflow.com/questions/43384039/how-to-get-input-textfield-values-when-enter-key-is-pressed-in-react-js/43384732
  //for the solution of how to get my textarea to submit with the enter key!
  //

  postMessageBySubmit = event => {
    event.preventDefault();
    if (this.state.value.length > 2 && this.state.value.length < 256) {
      this.props
        .postMessage({ text: this.state.value }, this.props.requestTag)
        .then(this.setState({ value: "" }));
    }
  };

  postMessageByEnter = event => {
    if (this.state.value.length > 2 && this.state.value.length < 256) {
      this.props
        .postMessage({ text: this.state.value }, this.props.requestTag)
        .then(this.setState({ value: "" }));
    }
  };

  handleCancel = event => {
    this.setState({ value: "" });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div className="newMessageBox">
        <i className="fas fa-user-edit fa-4x newMessageIcon" color="white" />
        <form className="newMessageText">
          <textarea
            type="textarea"
            placeholder="What's Happening . . .  (2 - 255 chrs)"
            rows="5"
            columns="500"
            onChange={this.keyPress}
            onKeyDown={this.keyPress}
            value={this.state.value}
            className="newMessageTextArea"
          ></textarea>
          <br />
          <div className="newMessageButtonDiv">
            <input
              type="submit"
              onClick={this.postMessageBySubmit}
              className="newMessageButton"
              value="Send Kweet"
            ></input>
            <button className="newMessageButton" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }
}

export default withAsyncAction("messages", "postMessage")(NewMessageBox);
