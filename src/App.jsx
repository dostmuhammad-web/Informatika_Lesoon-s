import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Achievements from "./pages/Achievements";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LabPage from "./pages/LabPage";
import Labs from "./pages/Labs";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import Stage from "./pages/Stage";
import Tests from "./pages/Tests";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="panel" element={<Dashboard />} />
        <Route path="kurs" element={<Course />} />
        <Route path="kurs/:stageId" element={<Stage />} />
        <Route path="dars/:lessonId" element={<Lesson />} />
        <Route path="laboratoriyalar" element={<Labs />} />
        <Route path="laboratoriya/:labId" element={<LabPage />} />
        <Route path="testlar" element={<Tests />} />
        <Route path="yutuqlar" element={<Achievements />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
