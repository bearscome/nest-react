import axios from "axios";
import { useContext, useState } from "react";
import UserInfoContext from "../context/UserInfoContext";

const Home = () => {
  const { userInfo, setUserInfo, setLogout } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;

  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const [registerId, setRegisterId] = useState();
  const [registePassword, setRegistePassword] = useState();
  const [gender, setGender] = useState();

  const getJwt = window.localStorage.getItem("jwt");

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
          const { jwt } = data;
          window.localStorage.setItem("jwt", jwt);
          //   로그인 시 사용자 정보 리턴
          setUserInfo(() => {
            return {
              status: true,
              username: "test",
              usergender: "male",
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

  const register = (e) => {
    console.log({
      registerId,
      registePassword,
      gender,
    });
    e.preventDefault();

    axios({
      url: "http://localhost:3000/auth/register",
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: registerId,
        password: registePassword,
        gender: gender,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form>
        <h2>로그인</h2>
        <label>아이디</label>
        <input type="text" onChange={({ target }) => setId(target.value)} />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        {status ? (
          <button onClick={logout}>로그아웃</button>
        ) : (
          <button onClick={(e) => login(e)}>로그인</button>
        )}
      </form>

      <form>
        <h2>회원가입</h2>
        <label>아이디</label>
        <input
          type="text"
          onChange={({ target }) => setRegisterId(target.value)}
        />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          onChange={({ target }) => setRegistePassword(target.value)}
        />
        <br />
        <p>성별</p>
        <div>
          <label>여성</label>
          <input
            type={"radio"}
            id={"female"}
            value={"female"}
            name={"gender"}
            onChange={({ target }) => setGender(target.value)}
          />
        </div>
        <div>
          <label>남성</label>
          <input
            type={"radio"}
            id={"male"}
            value={"male"}
            name={"gender"}
            onChange={({ target }) => setGender(target.value)}
          />
        </div>
        <br />
        <button onClick={(e) => register(e)}>회원가입</button>
      </form>
    </div>
  );
};

export default Home;
