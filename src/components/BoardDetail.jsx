import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BoardDetail = () => {
  const location = useLocation();
  const { board_id } = location.state;

  const [detail, setDetail] = useState({ status: false });

  useLayoutEffect(() => {
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
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
          <p>
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 답글:{" "}
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
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          </p>
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
