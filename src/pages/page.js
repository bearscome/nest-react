import Board from "../components/Board";
import BoardDetail from "../components/BoardDetail";
import BoardAdd from "../components/BoardAdd";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import BoardAddAnswer from "../components/BoardAddAnswer";

const gnbPage = [
  {
    src: "/",
    title: "홈",
    eletent: <Home title={"홈"} />,
  },
  {
    src: "login",
    title: "로그인",
    eletent: <Login title={"로그인"} />,
  },
  {
    src: "register",
    title: "회원가입",
    eletent: <Register title={"회원가입"} />,
  },
  {
    src: "board",
    title: "게시판",
    eletent: <Board title={"게시판"} />,
  },
  {
    src: "addBoard",
    title: "게시판 등록",
    eletent: <BoardAdd title={"게시판 등록"} />,
  },
];

const page = [
  {
    src: "/",
    title: "홈",
    eletent: <Home title={"홈"} />,
  },
  {
    src: "login",
    title: "로그인",
    eletent: <Login title={"로그인"} />,
  },
  {
    src: "register",
    title: "회원가입",
    eletent: <Register title={"회원가입"} />,
  },
  {
    src: "board",
    title: "게시판",
    eletent: <Board title={"게시판"} />,
  },
  {
    src: "addBoard",
    title: "게시판 등록",
    eletent: <BoardAdd title={"게시판 등록"} />,
  },
  {
    src: "board/detail/:id",
    title: "게시판 상세",
    eletent: <BoardDetail title={"게시판 상세"} />,
  },
  {
    src: "addBoardAnswer",
    title: "게시판 답글 등록",
    eletent: <BoardAddAnswer title={"게시판 답글 등록"} />,
  },
];

export { gnbPage, page };
