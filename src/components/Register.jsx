import axios from "axios";
import { useState } from "react";

const Register = ({ title }) => {
  const [registerId, setRegisterId] = useState();
  const [registePassword, setRegistePassword] = useState();
  const [gender, setGender] = useState();

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
    <form>
      <h2>{title}</h2>
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
  );
};

export default Register;
