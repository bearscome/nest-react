import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfoContext from "../context/UserInfoContext";

const BoardAddAnswer = ({ title }) => {
  const jwt = window.localStorage.getItem("jwt");
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;
  const { board_id, indent } = location.state;

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

    let indentValue = [];
    console.log("indent.length", indent);
    for (let i = 0; i < indent; i++) {
      indentValue.push("Re");
    }

    formData.append("title", contentTitle);
    formData.append("content", `${indentValue.join()}: ${content}`);
    formData.append("board_id", board_id);
    formData.append("username", username);
    formData.append("indent", indent);

    axios({
      url: "http://localhost:3000/board/answer/create",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((result) => {
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
      <br />
      <br />
      <div>
        <button onClick={() => add()}>답글 달기</button>
      </div>
    </div>
  );
};

export default BoardAddAnswer;
