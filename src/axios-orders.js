import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-f43a7-default-rtdb.firebaseio.com/",
});

export default instance;
