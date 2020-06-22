import React from "react";
import MessageCardFooter from "./MessageCardFooter";
import { Link } from ".";
import moment from 'moment'

class MessageCard extends React.Component {
  check = (time) => {
    if (moment(time).fromNow().split(' ').includes('seconds') || moment(time).fromNow().split(' ').includes('minutes') || moment(time).fromNow().split(' ').includes('hour') || moment(time).fromNow().split(' ').includes('hours')) {
      return true
    }
    else if (moment(time).fromNow().split(' ')[0] > 7 && moment(time).fromNow().split(' ').includes('days')){
      return false
    }
    else if (!moment(time).fromNow().split(' ').includes('days')) {
      return false
    }
  }
      render() {
    return (
      <React.Fragment>
        <div>
          <Link to={`/profile/${this.props.author}`}>
            <h4>{this.props.author}</h4>
          </Link>
          <p>{this.props.text}</p>
          {
          this.check(this.props.createdAt) ?
            <p>{moment(this.props.createdAt).fromNow()}</p> :
            <p>{new Date(this.props.createdAt).toDateString()}</p>
          }
        </div>
        <MessageCardFooter
          id={this.props.id}
          likes={this.props.likes}
          requestTag={this.props.requestTag}
          author={this.props.author}
        />
      </React.Fragment>
    );
  }
}

export default MessageCard;
