import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function cb2(data) {
      if (data.username) {
        setUseremail(data.username);
        setIsLoading(false);
      }
      // return data;
      console.log(data);
    }

    function cb(res) {
      return res.json().then(cb2);
    }
    fetch("http://localhost:3005/admin/me", {
      headers: {
        // "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(cb);
  }, []);

  if (useremail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"}>Udemy</Typography>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/addcourse");
                  // window.location ="/addcourse"
                  console.log("31323");
                }}
              >
                Add Course
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/register");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AppBar;
