import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
// import auth from "./authService";

// axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
//responsible for logic behind calling backend services. decided on which library we use and how. returns unified api though.
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast("Unexpected error occured.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt
};
