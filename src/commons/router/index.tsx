import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { MainPage } from "../../pages/main/MainPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { NavBar } from "../../components/nav/NavBar";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import { isAuth } from "../auth/Auth";

function BaseRoutes(props: any) {
  const { state } = useContext(AuthContext);
  return (
    <Router>
      {isAuth() || state.auth ? <NavBar /> : <></>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default BaseRoutes;
