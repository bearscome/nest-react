import Board from "../components/Board";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

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
];

export default page;
