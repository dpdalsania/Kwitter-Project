import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import {
  GETUSER,
  CREATEUSER,
  DELETEUSER,
  LOGOUT,
  PUTUSERPICTURE,
  UPDATEUSERINFO
} from "../actionTypes";
import { push } from "connected-react-router";

import { login } from "./auth";

const url = domain + "/users";

export const getUser = userName => dispatch => {
  dispatch({
    type: GETUSER.START
  });

  return fetch(url + "/" + userName, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GETUSER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: GETUSER.FAIL, payload: err }));
    });
};

const _createUser = registerData => dispatch => {
  dispatch({ type: CREATEUSER.START });

  return fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(registerData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: CREATEUSER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: CREATEUSER.FAIL, payload: err }));
    });
};

export const createUser = registerData => (dispatch, getState) => {
  return dispatch(_createUser(registerData))
    .then(() =>
      dispatch(
        login({
          username: registerData.username,
          password: registerData.password
        })
      )
    )
    .then(() => {
      return dispatch({
        type: LOGOUT.SUCCESS,
        payload: { statusCode: 200 }
      });
    });
};

export const deleteUser = () => (dispatch, getState) => {
  dispatch({ type: DELETEUSER.START });

  const { username, token } = getState().auth.login.result;

  return fetch(url + "/" + username, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: DELETEUSER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: DELETEUSER.FAIL, payload: err }));
    })
    .then(() => {
      return dispatch({
        type: LOGOUT.SUCCESS,
        payload: { statusCode: 200 }
      });
    });
};

const _updateUserInfo = ({ username, displayName, about, password }) => (
  dispatch,
  getState
) => {
  const token = getState().auth.login.result.token;
  const body = {
    password: password,
    about: about,
    displayName: displayName
  };
  dispatch({ type: UPDATEUSERINFO.START });
  return fetch(url + "/" + username, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify(body)
  })

    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: UPDATEUSERINFO.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({
          type: UPDATEUSERINFO.FAIL,
          payload: err
        })
      );
    });
};

export const updateUserInfo = updateInfo => dispatch => {
  return dispatch(_updateUserInfo(updateInfo)).then(() =>
    dispatch(push("/profile/" + updateInfo.username))
  );
};

const _putUserPicture = formData => (dispatch, getState) => {
  dispatch({ type: PUTUSERPICTURE.START });

  const { username, token } = getState().auth.login.result;

  return fetch(url + "/" + username + "/picture", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    },
    body: formData
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: PUTUSERPICTURE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: PUTUSERPICTURE.FAIL, payload: err })
      );
    });
};

export const putUserPicture = (formData, userId) => dispatch => {
  return dispatch(_putUserPicture(formData)).then(() => {
    return dispatch(getUser(userId));
  });
};
