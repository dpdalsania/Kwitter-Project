import { UNLIKEMESSAGE } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const unlikeMessage = (state = initialState, action) => {
  switch (action.type) {
    case UNLIKEMESSAGE.SUCCESS:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default withAsyncReducer(UNLIKEMESSAGE, unlikeMessage);
