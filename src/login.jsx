import { Typography, Button, TextField, Card } from "@mui/material";

function Login() {
  return (
    <div style={{backgroundColor: "red", width: "90%", height: "40px" }}>
      <div style={{display: "flex", justifyContent: "center", backgroundColor: "yellow"}}>
        <Typography>Welcome to Udemy. Login below</Typography>
      </div>
      <div style={{display: "flex", justifyContent: "center", backgroundColor: "green"}}>
        <Card variant="outlined">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            type={"password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
          />

          <br />
          <br />
          <Button variant="contained">Login</Button>
        </Card>
      </div>
    </div>
  );
}
export default Login;
