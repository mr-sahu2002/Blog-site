// axios-config.js
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

const token = Cookies.get("csrftoken"); // Replace with the actual CSRF token

const headers = {
  "X-CSRFToken": token,
  "Content-Type": "application/json",
};

export default client;
export { headers };
