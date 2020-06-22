import React from "react";
import { withAsyncAction, connect } from "../HOCs";
import { Input } from "semantic-ui-react";

class UploadUserPicture extends React.Component {
  handleUploadUserPicture = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.props.putUserPicture(formData, this.props.username);
  };
  render() {
    return (
      this.props.username === this.props.loggedInUserName && (
        <form
          onSubmit={this.handleUploadUserPicture}
          className="changePictureButtons"
        >
          <div className="ui input">
            <input
              id="choosePictureButton"
              type="file"
              name="picture"
              placeholder="Select Picture"
            ></input>
          </div>

          <Input
            id="submitPictureButton"
            type="submit"
            value="Upload Picture"
          ></Input>
        </form>
      )
    );
  }
}

const mapStateToProps = state => {
  return { loggedInUserName: state.auth.login.result.username };
};

export default connect(mapStateToProps)(
  withAsyncAction("users", "putUserPicture")(UploadUserPicture)
);
