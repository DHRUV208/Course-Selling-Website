import { Typography, Button, TextField, Card } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
function Login() {

  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div style={{ backgroundColor: "red", width: "90%", height: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "yellow",
        }}
      >
        <Typography>Welcome to Udemy. Login below</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          
        }}
      >
        <Card variant="outlined" style={{width: 400, padding: 20}}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            type={"password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />

          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3005/admin/login",
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                  },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              window.location = "/";
            }}
          >
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default Login;
