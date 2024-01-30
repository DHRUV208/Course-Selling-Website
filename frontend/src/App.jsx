import { RecoilRoot, useSetRecoilState } from "recoil";
import AddCourse from "./components/AddCourse";
import AppBar from "./components/AppBar";
import Course from "./components/Course";
import Courses from "./components/Courses";
import Register from "./components/Register";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { userState } from "./store/atoms/user";
import { BASE_URL } from "./config.js";
function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeee" }}
      >
        <Router>
          <AppBar />
          <InitUser />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/" element={<Landing />} /> */}
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (err) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App;
