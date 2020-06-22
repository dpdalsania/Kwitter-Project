import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import { LIKEMESSAGE, UNLIKEMESSAGE, LOGOUT } from "../actionTypes";
import { getMessages } from "./messages";

const url = domain + "/likes";

export const _likeMessage = (messageId, token) => dispatch => {
  dispatch({
    type: LIKEMESSAGE.START
  });

  return fetch(url, {
    method: "POST",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token },
    body: JSON.stringify(messageId)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: LIKEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      if (err.statusCode === 401) {
        return dispatch({
          type: LOGOUT.SUCCESS,
          payload: { statusCode: 200 }
        });
      }
      return Promise.reject(dispatch({ type: LIKEMESSAGE.FAIL, payload: err }));
    });
};

export const _unlikeMessage = (likeId, token) => dispatch => {
  dispatch({
    type: UNLIKEMESSAGE.START
  });

  return fetch(url + `/` + likeId, {
    method: "DELETE",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token }
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: UNLIKEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      if (err.statusCode === 401) {
        return dispatch({
          type: LOGOUT.SUCCESS,
          payload: { statusCode: 200 }
        });
      }
      return Promise.reject(
        dispatch({ type: UNLIKEMESSAGE.FAIL, payload: err })
      );
    });
};

export const likeMessage = (messageId, token, requestTag) => dispatch => {
  return dispatch(_likeMessage(messageId, token)).then(() =>
    dispatch(getMessages(requestTag))
  );
};

export const unlikeMessage = (messageId, token, requestTag) => dispatch => {
  return dispatch(_unlikeMessage(messageId, token)).then(() =>
    dispatch(getMessages(requestTag))
  );
};
