import axios from "axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfoContext from "../context/UserInfoContext";

const BoardDetail = () => {
  const jwt = window.localStorage.getItem("jwt");
  const location = useLocation();
  const { userInfo } = useContext(UserInfoContext);
  const { status, username, usergender } = userInfo;
  const { board_id } = location.state;

  const [detail, setDetail] = useState({ status: false });
  const [comment, setComment] = useState("");
  const [addCommentStatus, setAddCommentStatus] = useState(false);

  const addComment = () => {
    if (comment.length === 0) alert("댓글을 작성해 주세요.");
    console.log(username, comment, board_id);
    axios({
      url: "http://localhost:3000/board/history/comment",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        board_id,
        username,
        content: comment,
      },
    })
      .then((res) => {
        console.warn(res);
        const { status, data } = res;
        if (status === 201) {
          setAddCommentStatus((status) => false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useLayoutEffect(() => {
    console.log("console.log(username, comment, board_id);");
    axios({
      url: "http://localhost:3000/board/histroy/detail",
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        id: board_id,
      },
    })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setDetail({ status: true, ...data });
          setAddCommentStatus((status) => true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [addCommentStatus]);

  return (
    <div>
      {detail.status && (
        <div>
          <h2>제목: {detail.title}</h2>
          <p>
            본문: {detail.content}
            {detail.image_path && (
              <img src={`http://localhost:3000/${detail.image_path}`} />
            )}
          </p>
          <p>작성자: {detail.username}</p>
          <p>수정시간: {detail.updateAt}</p>
          <div>
            <div>
              <div>
                답글:{" "}
                <input
                  type={"text"}
                  onChange={({ target }) => setComment(target.value)}
                />
                <button onClick={() => addComment()}>확인</button>
              </div>
            </div>
            {detail.__comments__.length > 0 &&
              detail.__comments__.map((data) => {
                return (
                  <div key={data.comment_id}>
                    ----------------------------
                    <p>작성자: {data.username}</p>
                    <p>내용: {data.content}</p>
                    <p>수정시간: {data.updateAt}</p>
                    ----------------------------
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
