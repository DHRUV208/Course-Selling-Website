import { Typography, Button, TextField, Card } from "@mui/material";
import { useState } from "react";

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
          onClick={()=>{

            function cb2(data){
                localStorage.setItem("token", data.token);
                console.log(data);
            }

            function cb (res){
                res.json().then(cb2);
            }
            fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(cb)
          }}
          >Register</Button>
        </Card>
      </div>
    </div>
  );
}
export default Register;
