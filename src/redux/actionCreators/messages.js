import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import { DELETEMESSAGE, GETMESSAGES, POSTMESSAGE } from "../actionTypes";

const url = domain + "/messages";

export const _deleteMessage = (messageId, token) => dispatch => {
  dispatch({
    type: DELETEMESSAGE.START
  });
  return fetch(url + `/` + messageId, {
    method: "DELETE",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token }
    // body: JSON.stringify(messageId)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: DELETEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: DELETEMESSAGE.FAIL, payload: err })
      );
    });
};
//kwitter-api.herokuapp.com/messages?limit=100&offset=0&username=test
export const getMessages = requestTag => dispatch => {
  dispatch({
    type: GETMESSAGES.START
  });
  return fetch(url + requestTag, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GETMESSAGES.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: GETMESSAGES.FAIL, payload: err }));
    });
};

const _postMessage = messageData => dispatch => {
  dispatch({
    type: POSTMESSAGE.START
  });

  const token = JSON.parse(localStorage.login).result.token;

  return fetch(url, {
    method: "POST",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token },
    body: JSON.stringify(messageData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: POSTMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: POSTMESSAGE.FAIL, payload: err }));
    });
};

export const postMessage = (messageBody, requestTag) => dispatch => {
  return dispatch(_postMessage(messageBody)).then(() => {
    return dispatch(getMessages(requestTag));
  });
};

export const deleteMessage = (messageId, token, requestTag) => dispatch => {
  return dispatch(_deleteMessage(messageId, token)).then(() => {
    return dispatch(getMessages(requestTag));
  });
};
