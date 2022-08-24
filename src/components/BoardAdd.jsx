import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../context/UserInfoContext";

const BoardAdd = ({ title }) => {
  const jwt = window.localStorage.getItem("jwt");
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;

  const [contentTitle, setContentTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const add = () => {
    if (!status) {
      alert("로그인하고 오세요");
      return;
    } else if (contentTitle.length < 1 || content.length < 1) {
      alert("제목 또는 본문의 글자를 작성해주세요");
      return;
    }

    const formData = new FormData();

    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }
    formData.append("title", contentTitle);
    formData.append("content", content);

    console.log("@@@_FormdData", formData);

    axios({
      url: "http://localhost:3000/board/create",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((result) => {
        console.log("????? 갑자기 안돼?", result);
        if (result.status === 201) {
          alert("등록이 완료되었습니다.");
          navigate("/board");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFile = (value) => {
    setFile(value);
  };

  return (
    <div>
      <h2>{title}</h2>
      제목:{" "}
      {
        <input
          type={"text"}
          onChange={({ target }) => setContentTitle(target.value)}
        />
      }
      <br />
      본문:{" "}
      {
        <textarea
          row={"4"}
          cols={"50"}
          onChange={({ target }) => setContent(target.value)}
        />
      }
      <br />
      <input type={"file"} onChange={({ target }) => addFile(target.files)} />
      <button onClick={() => add()}>등록하기</button>
    </div>
  );
};

export default BoardAdd;
