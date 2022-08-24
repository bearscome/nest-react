import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfoContext from "../context/UserInfoContext";

const Login = ({ title }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const login = (e) => {
    e.preventDefault();

    axios({
      url: "http://localhost:3000/auth/login",
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: id,
        password,
      },
    })
      .then((result) => {
        const { data } = result;
        console.log(result);
        if (result.data.statusCode === 200) {
          console.log(data);
          const { accessToken, user } = data;
          window.localStorage.setItem("jwt", accessToken);
          //   로그인 시 사용자 정보 리턴
          setUserInfo(() => {
            return {
              status: true,
              ...user,
            };
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const logout = (e) => {
    e.preventDefault();
    if (status) {
      window.localStorage.removeItem("jwt");
    }
    window.localStorage.removeItem("jwt");
    setUserInfo(() => {
      return {
        status: false,
        username: "",
        usergender: "",
      };
    });
  };

  return (
    <form>
      <h2>{title}</h2>
      {!status && (
        <div>
          <label>아이디</label>
          <input type="text" onChange={({ target }) => setId(target.value)} />
          <br />
          <label>비밀번호</label>
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      )}

      <br />
      {status ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <button onClick={(e) => login(e)}>로그인</button>
      )}
    </form>
  );
};

export default Login;
