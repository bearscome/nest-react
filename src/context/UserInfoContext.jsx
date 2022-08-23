import { createContext } from "react";

const UserInfoContext = createContext({
  userInfo: {
    status: false,
    username: "",
    usergender: "",
  },
  setUserInfo: () => {},
});

export default UserInfoContext;
