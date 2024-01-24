import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();
const [useremail, setUseremail] = useState(null);

  useEffect(() => {
    function cb2(data) {
        if(data.username){
             setUseremail(data.username);

        }
      // return data;
      console.log(data);
      
    } 

    function cb(res) {
      return res.json().then(cb2);
    }
    fetch("http://localhost:3000/admin/me", {
      headers: {
        // "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(cb);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography>Udemy</Typography>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/register");
              // window.location ="/register"
            }}
          >
            Register
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
              // window.loaction = "/login"
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
