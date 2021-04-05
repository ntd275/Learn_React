import axios from "axios";

let UserApi = {
  login: async (username, password) => {
    let res = await axios.post("/login", {
      username: username,
      password: password,
    });
    return res;
  },
};
export default UserApi;
