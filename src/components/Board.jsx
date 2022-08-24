import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = ({ title }) => {
  const navigate = useNavigate();
  const limit = 10;
  let count = 0;

  const [offset, setOffset] = useState(0);
  const [list, setList] = useState({
    status: false,
    total: 0,
    data: [],
  });

  const paging = (direct) => {
    if (direct === "prev") {
      if (!count === 0) count--;
    } else if (direct === "next") {
      if (offset < list?.total) count++;
    }
    setOffset(count * limit);
  };

  const moveDetail = (board_id) => {
    navigate(`/board/detail/${board_id}`, { state: { board_id } });
  };

  useLayoutEffect(() => {
    axios({
      url: "http://localhost:3000/board/history",
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        limit,
        offset,
      },
    })
      .then((res) => {
        const { result, status, total } = res.data;
        if (status === 4000) {
          setList(() => {
            return {
              status: true,
              data: result,
              total,
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [offset]);

  return (
    <div>
      <h2>{title}</h2>
      {list.status ? (
        <div>
          총 갯수 {list?.total}
          {list?.data?.map((data) => {
            return (
              <p
                key={data?.borad_id}
                onClick={() => moveDetail(data?.borad_id)}
              >
                <span>번호: {data?.borad_id}</span>
                <span>제목: {data?.title}</span>
                <span>내용: {data?.content}</span>
                <span>수정시간: {data?.updateAt}</span>
              </p>
            );
          })}
          <div>
            <button onClick={() => paging("prev")}>이전</button>
            페이징 처리 화살표
            <button onClick={() => paging("next")}>다음</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Board;
