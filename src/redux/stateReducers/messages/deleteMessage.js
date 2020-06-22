// hey group - this is copied from login.js and is intended as a sample to model
//what we might want to do with our reducers.

import { DELETEMESSAGE } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const deleteMessage = (state = initialState, action) => {
  switch (action.type) {
    case DELETEMESSAGE.SUCCESS:
        return {...initialState}
    default:
     
      return {...state};
  }
};

export default withAsyncReducer(DELETEMESSAGE, deleteMessage);

// const initialState = {
//   result: null,
//   loading: false,
//   error: null
// };

// const getInitStateFromStorage = (key, initialState) => {
//   const storedState = JSON.parse(localStorage.getItem(key));

//   if (storedState) {
//     const unchangedInitialStateProps =
//       Object.keys(storedState).every(
//         property => initialState[property] !== undefined
//       ) &&
//       Object.keys(initialState).every(
//         property => storedState[property] !== undefined
//       );
//     if (unchangedInitialStateProps) {
//       return storedState;
//     }
//   }
//   return initialState;
// };

// const deleteMessage = (
//   state = getInitStateFromStorage("login", initialState),
//   action
// ) => {
//   switch (action.type) {
//     case DELETEMESSAGE.SUCCESS:
//       return { ...initialState };
//     default:
//       return state;
//   }
// };

// export default withAsyncReducer(DELETEMESSAGE, deleteMessage);
