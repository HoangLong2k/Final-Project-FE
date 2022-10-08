import { createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
    idImage: "",
    islogin: false,
    dataSubmitted: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.islogin = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
    saveDataSubmitted: (state, action) => {
      state.dataSubmitted = action.payload;
    },
    // saveData: (state, action) => {
    //   state.idImage = action.payload;
    // },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess, saveDataSubmitted } = slice.actions;

export const logIn =
  ({ username, password }, callback) =>
  async (dispatch) => {
    try {
      const res = await request.post("http://127.0.0.1:3000/users/login", {
        username,
        password,
      });
      if (res.status === 200) {
        callback();
        dispatch(loginSuccess(true));
        localStorage.setItem("username", JSON.stringify(username));
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
        localStorage.setItem("username", JSON.stringify(username));
        dispatch(loginSuccess(true));
      }
    } catch (e) {
      return console.error(e.message);
    }
  };

export const registration = (payload, callback) => async (dispatch) => {
  try {
    const res = await request.post("http://127.0.0.1:3000/registration", {
      ...payload,
      username: JSON.parse(localStorage.getItem("username")),
    });
    if (res.status === 200) {
      callback();
    }
  } catch (e) {
    return console.error(e.message);
  }
};

export const getDataSubmitted = () => async (dispatch) => {
  try {
    const res = await request.post(
      "http://127.0.0.1:3000/getAllDataSubmitted",
      {
        username: JSON.parse(localStorage.getItem("username")),
      }
    );
    if (res.status === 200) {
      console.log(res);
      dispatch(saveDataSubmitted(res.data[0]));
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
