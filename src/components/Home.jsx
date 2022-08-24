import axios from "axios";
import { useContext, useState } from "react";
import UserInfoContext from "../context/UserInfoContext";

const Home = ({ title }) => {
  const { userInfo } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Home;
