import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:1337/',
  baseURL: 'https://hering-api.herokuapp.com/',
  headers: {
    "Content-type": "application/json",
  },
});