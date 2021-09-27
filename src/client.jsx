import axios from "axios";

export default axios.create({
  baseURL: 'https://hering-api.herokuapp.com/',
  headers: {
    "Content-type": "application/json",
  },
});