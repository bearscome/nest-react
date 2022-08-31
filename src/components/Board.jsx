import axios from "axios";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../context/UserInfoContext";

const Board = ({ title }) => {
  const { userInfo } = useContext(UserInfoContext);
  const { status, authorities } = userInfo;

  const navigate = useNavigate();
  const limit = 10;
  const countT = useRef(0);

  const [offset, setOffset] = useState(0); // paging
  const [apiResult, setApiResult] = useState(false); // all delete status
  const [list, setList] = useState({
    status: false,
    total: 0,
    data: [],
  });
  const [listPage, setListPage] = useState([]);

  const paging = (type, direct = "", clickNum = 0) => {
    if (type === "number") {
      countT.current = clickNum;
      setOffset(() => countT.current * limit);
    } else if (type === "button") {
      if (direct === "prev") {
        if (countT.current > 0) {
          countT.current = countT.current - 1;
          setOffset(() => countT.current * limit);
        }
      } else if (direct === "next") {
        if ((offset + limit) * (countT.current + 1) < list?.total) {
          countT.current = countT.current + 1;
          setOffset(() => countT.current * limit);
        }
      }
    }
  };

  const moveDetail = (board_id) => {
    navigate(`/board/detail/${board_id}`, { state: { board_id } });
  };

  const deleteAll = () => {
    const jwt = window.localStorage.getItem("jwt");
    if (window.confirm("게시판의 전체 내용을 삭제하시겠습니까?") === true) {
      axios({
        url: "http://localhost:3000/board/deleteAll",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        data: {},
      }).then((res) => {
        if (res.data.statusCode === 201) {
          alert("전체삭제가 완료되었습니다.");
          setApiResult(true);
        }
      });
    }
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

          let list = [];
          for (let i = 0; i < Math.ceil(total / limit); i++) {
            list.push(i + 1);
          }
          setListPage(list);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [offset, apiResult]);

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
            <button onClick={() => paging("button", "prev")}>이전</button>
            {listPage.map((number) => (
              <span
                key={number}
                style={{ margin: "0 10px" }}
                onClick={({ target }) => {
                  paging("number", "", target.outerText - 1);
                }}
              >
                {number}
              </span>
            ))}
            <button onClick={() => paging("button", "next")}>다음</button>
          </div>
          {authorities === "ADMIN" && (
            <button onClick={() => deleteAll()}>전체 삭제</button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Board;
