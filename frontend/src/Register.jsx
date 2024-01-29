import { Typography, Button, TextField, Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  return (
    <div style={{ width: "90%", height: "40px" }}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Typography>Welcome to Udemy. Register below</Typography>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined">
          <TextField
            fullWidth
            // id="username"
            label="Email"
            variant="outlined"
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
          />
          <br />
          <br />
          <TextField
            type={"password"}
            // id="password"
            label="Password"
            variant="outlined"
            fullWidth
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
          />

          <br />
          <br />
          <Button 
          variant="contained"
          onClick={ async ()=>{

          

           const response = await axios.post("http://localhost:3005/admin/signup", {
              username: email,
              password: password
            });
            const data = response.data;
            localStorage.setItem("token", data.token );
            
          }}
          >Register</Button>
        </Card>
      </div>
    </div>
  );
}
export default Register;
