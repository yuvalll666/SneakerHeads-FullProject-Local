import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const exErr = error.response && error.response.status >= 403;
  if (exErr) {
    console.log("An unexpected error occurred with the httpService");
    return Promise.reject(error);
  }
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
