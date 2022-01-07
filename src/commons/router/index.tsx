import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { MainPage } from "../../pages/main/MainPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { NavBar } from "../../components/nav/NavBar";
function BaseRoutes(props: any) {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default BaseRoutes;
