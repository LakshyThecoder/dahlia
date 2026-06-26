import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Landing from "@/pages/Landing";
import Oven from "@/pages/Oven";
import Lab from "@/pages/Lab";
import Menu from "@/pages/Menu";
import CommunityPage from "@/pages/CommunityPage";
import LeagueAccount from "@/pages/LeagueAccount";
import AdminDashboard from "@/pages/AdminDashboard";
import SmoothScroll from "@/components/SmoothScroll";

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Cursor />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/oven" element={<Oven />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/league/account" element={<LeagueAccount />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
