import { createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
    idImage: "",
    islogin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user.islogin = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
    saveIdImageRespAction: (state, action) => {
      state.idImage = action.payload;
    },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess } = slice.actions;

export const logIn =
  ({ username, password }, callback) =>
  async (dispatch) => {
    console.log(callback);
    try {
      const res = await request.post("http://127.0.0.1:3000/users/login", {
        username,
        password,
      });
      if (res.status === 200) {
        console.log(1);
        dispatch(loginSuccess(true));
        callback();
        return;
      }
    } catch (e) {
      return console.error(e.message);
    }
  };

export const signUp =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      console.log(username, password);
      const res = await request.post("http://127.0.0.1:3000/users/signup", {
        username,
        password,
      });
      if (res.status === 200) {
        dispatch(loginSuccess(true));
      }
    } catch (e) {
      return console.error(e.message);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
