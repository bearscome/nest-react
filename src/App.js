import page from "./pages/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfoContext from "./context/UserInfoContext";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({
    status: false,
    username: "",
    usergender: "",
  });

  return (
    <div className="App">
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <BrowserRouter>
          <Routes>
            {page?.map(({ src, eletent }) => {
              return <Route path={src} element={eletent} key={src} />;
            })}
          </Routes>
        </BrowserRouter>
      </UserInfoContext.Provider>
      a
    </div>
  );
}

export default App;
