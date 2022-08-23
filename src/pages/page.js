import Board from "../components/Board";
import Home from "../components/Home";
import Login from "../components/Login";

const page = [
  {
    src: "/",
    eletent: <Home />,
  },
  {
    src: "login",
    eletent: <Login />,
  },
  {
    src: "board",
    eletent: <Board />,
  },
];

export default page;
