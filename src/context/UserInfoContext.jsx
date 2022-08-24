import { createContext } from "react";

const UserInfoContext = createContext({
  userInfo: {
    status: false,
    id: "",
    social_type: "",
    updateAt: "",
    gender: "",
    username: "",
  },
  setUserInfo: () => {},
});

export default UserInfoContext;
