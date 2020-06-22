import { LIKEMESSAGE } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const likeMessage = (state = initialState, action) => {
  switch (action.type) {
    case LIKEMESSAGE.SUCCESS:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default withAsyncReducer(LIKEMESSAGE, likeMessage);
