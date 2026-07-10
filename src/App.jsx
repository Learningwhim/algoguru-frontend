import ExperiencedPage from "./pages/ExperiencedPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BeginnerPage from "./pages/BeginnerPage";
import TutorialPage from "./pages/TutorialPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/beginner" element={<BeginnerPage />} />
        <Route path="/experienced" element={<ExperiencedPage />} />
        <Route path="/tutorial/:tutorialId" element={<TutorialPage />} />
      </Routes>
    </BrowserRouter>
  );
}