import { GETMESSAGES } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const getMessages = (state = initialState, action) => {
  switch (action.type) {
    case GETMESSAGES.SUCCESS:
      return { ...state, result: action.payload };

    default:
      return state;
  }
};

export default withAsyncReducer(GETMESSAGES, getMessages);
