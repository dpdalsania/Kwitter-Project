import React from "react";
import { connect } from "react-redux";

class NewCreatedAt extends React.Component {
  formatDate(string) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return new Date(string).toLocaleDateString([], options);

    //the above function courtesy of Stack Overflow at
    //https://stackoverflow.com/questions/50430968/converting-string-date-in-react-javascript
  }

  render() {
    return <p>{this.formatDate(this.props.createdAt)}</p>;
  }
}

const mapStateToProps = state => {
  return { createdAt: state.users.getUser.result.user.createdAt };
};

export default connect(mapStateToProps)(NewCreatedAt);
