import { createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
import { toggleLoading } from "../pages/Loading";
import { Modal } from "antd";
// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: null,
    idImage: "",
    islogin: false,
    dataSubmitted: [],
    admin: [],
    dataQr: "",
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
    saveDataAdmin: (state, action) => {
      state.admin = action.payload;
    },
    saveDataQr: (state, action) => {
      state.dataQr = action.payload.split("|");
    },
  },
});
export default slice.reducer;
// Actions
const {
  loginSuccess,
  logoutSuccess,
  saveDataSubmitted,
  saveDataAdmin,
  saveDataQr,
} = slice.actions;

export const logIn =
  ({ username, password }, callback) =>
  async (dispatch) => {
    try {
      toggleLoading(true);
      const res = await request.post(
        `${process.env.APPLICATION_API}/users/login`,
        {
          username,
          password,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("role", JSON.stringify(res.data.role));
        callback();
        dispatch(loginSuccess(true));
      }
      toggleLoading(false);
    } catch (e) {
      Modal.error({
        title: "Đăng nhập thất bại",
        content: "Sai tên đăng nhập hoặc mật khẩu",
      });
      toggleLoading(false);
      return console.error(e.message);
    }
  };

export const signUp =
  ({ username, password, role }, callback) =>
  async (dispatch) => {
    try {
      toggleLoading(true);
      const res = await request.post(
        `${process.env.APPLICATION_API}/users/signup`,
        {
          username,
          password,
          role,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("role", JSON.stringify(res.data.role));
        callback();
        dispatch(loginSuccess(true));
      }
      toggleLoading(false);
    } catch (e) {
      Modal.error({
        title: "Đăng nhập thất bại",
        content: "Sai tên đăng nhập hoặc mật khẩu",
      });
      toggleLoading(false);
      return console.error(e.message);
    }
  };

export const registration = (payload, callback) => async (dispatch) => {
  try {
    toggleLoading(true);
    const res = await request.post(
      `${process.env.APPLICATION_API}/registration`,
      {
        ...payload,
        username: JSON.parse(localStorage.getItem("username")),
      }
    );
    if (res.status === 200) {
      callback();
    }
    toggleLoading(false);
  } catch (e) {
    toggleLoading(false);
    return console.error(e.message);
  }
};

export const getDataSubmitted = () => async (dispatch) => {
  try {
    toggleLoading(true);
    const res = await request.post(
      `${process.env.APPLICATION_API}/getAllDataSubmitted`,
      {
        username: JSON.parse(localStorage.getItem("username")),
      }
    );
    if (res.status === 200) {
      dispatch(saveDataSubmitted(res.data || []));
    }
    toggleLoading(false);
  } catch (e) {
    toggleLoading(false);
    return console.error(e.message);
  }
};

export const getDataAdmin = () => async (dispatch) => {
  try {
    toggleLoading(true);
    const res = await request.post(
      `${process.env.APPLICATION_API}/getAllDataSubmitted/ad`
    );
    if (res.status === 200) {
      dispatch(saveDataAdmin(res.data));
    }
    toggleLoading(false);
  } catch (e) {
    toggleLoading(false);
    return console.error(e.message);
  }
};

export const decodeQR = (payload) => async (dispatch) => {
  try {
    toggleLoading(true);
    const formData = new FormData();
    formData.append("file", payload[0].file);

    const options = {
      method: "POST",
      url: `https://api.qrserver.com/v1/read-qr-code/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    const res = await request(options);
    if (res.status === 200) {
      console.log(res.data);
      dispatch(saveDataQr(res.data[0].symbol[0].data));
    }
    toggleLoading(false);
  } catch (e) {
    toggleLoading(false);
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
