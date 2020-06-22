// hey group - this is copied from login.js and is intended as a sample to model
//what we might want to do with our reducers.

import { POSTMESSAGE } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const postMessage = (state = initialState, action) => {
  switch (action.type) {
    case POSTMESSAGE.SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default withAsyncReducer(POSTMESSAGE, postMessage);
