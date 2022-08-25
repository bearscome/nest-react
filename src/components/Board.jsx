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
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>답글번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>수정시간</th>
              </tr>
            </thead>
            <tbody>
              {list?.data?.map((data) => {
                return (
                  <tr
                    key={data?.borad_id}
                    onClick={() => moveDetail(data?.borad_id)}
                  >
                    <th>{data?.borad_id}</th>
                    {data?.indent ? <th>{data?.indent}</th> : <th>0</th>}
                    <td>{data?.title}</td>
                    <td>{data?.content}</td>
                    <td>{data?.updateAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
