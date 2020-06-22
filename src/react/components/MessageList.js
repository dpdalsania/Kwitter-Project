import React from "react";
import MessageCard from "./MessageCard";
import "./MessageList.css";
import { withAsyncAction } from "../HOCs";
import { Spinner } from ".";

class MessageList extends React.Component {
  componentDidMount = () => {
    this.props.getMessages(this.props.requestTag);
  };

  componentDidUpdate(prevProps) {
    if (this.props.requestTag !== prevProps.requestTag) {
      this.props.getMessages(this.props.requestTag);
    }
  }

  render() {
    return !this.props.result ? (
      <Spinner />
    ) : (
      <div className="messageList">
        {this.props.result.messages.map(message => {
          return (
            <div className="messageCard" key={message.id}>
              <MessageCard
                requestTag={this.props.requestTag}
                id={message.id}
                author={message.username}
                text={message.text}
                createdAt={message.createdAt}
                likes={message.likes}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAsyncAction("messages", "getMessages")(MessageList);
