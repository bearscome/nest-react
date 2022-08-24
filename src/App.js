import page from "./pages/page";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import UserInfoContext from "./context/UserInfoContext";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [userInfo, setUserInfo] = useState({
    status: false,
    username: "",
    usergender: "",
  });
  console.warn("title", title);

  // useEffect(() => {}, [location]);

  return (
    <div className="App">
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <BrowserRouter>
          <ul>
            {page.map(({ src, title }) => {
              return (
                <li>
                  <Link
                    to={`/${src.includes("/") ? "" : src}`}
                    key={title}
                    state={title}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Routes>
            {page?.map(({ src, eletent, title }) => {
              return <Route path={src} element={eletent} key={src} />;
            })}
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
