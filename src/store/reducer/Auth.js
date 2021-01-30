import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const InitialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectpath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.idToken,
    userId: action.userId,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: null,
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    authRedirectpath: "/",
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectpath: action.path,
  });
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
