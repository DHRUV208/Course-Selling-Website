import { RecoilRoot } from "recoil";
import AddCourse from "./AddCourse";
import AppBar from "./AppBar";
import Course from "./Course";
import Courses from "./Courses";
import Register from "./Register";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeee" }}>
      <RecoilRoot>
        <Router>
          <AppBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

function BigText() {
  return <h1>Hi There</h1>;
}

function TodoApp() {
  return <div>Todo App</div>;
}
export default App;
