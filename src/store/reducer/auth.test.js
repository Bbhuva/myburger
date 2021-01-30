import reducer from "./Auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectpath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectpath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      loading: false,
      error: null,
      authRedirectpath: "/",
    });
  });
});
