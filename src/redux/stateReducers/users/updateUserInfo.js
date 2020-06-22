import { UPDATEUSERINFO } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: '',
  loading: false,
  error: null
};

const updateUserInfo = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default withAsyncReducer(UPDATEUSERINFO, updateUserInfo);
