import axios from "axios";

const request = axios.create({
  timeout: 60000,
  headers: {
    Referer: "http://127.0.0.1:5000",
    "Content-Type": "application/json",
  },
});

export default request;
