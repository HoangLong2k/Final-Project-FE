import { createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
    idImage: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
    saveIdImageResp: (state, action) => {
      state.idImage = action.payload;
    },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess, saveIdImageResp } = slice.actions;

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      // const res = await api.post('/api/auth/login/', { username, password })
      dispatch(loginSuccess({ username }));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getInfoIdImage =
  ({ image }) =>
  async (dispatch) => {
    try {
      const res = await request.post("http://127.0.0.1:5000/member", {
        image,
      });
      console.log(res);
      dispatch(saveIdImageResp({}));
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
