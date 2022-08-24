import page from "./pages/page";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UserInfoContext from "./context/UserInfoContext";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({
    status: false,
    id: "",
    social_type: "",
    updateAt: "",
    gender: "",
    username: "",
  });

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
          <div>
            <p>
              {userInfo.status &&
                `아이디: ${userInfo.username}, 성별: ${userInfo.gender}, 유니크아이디:${userInfo.id}`}
            </p>
          </div>

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
