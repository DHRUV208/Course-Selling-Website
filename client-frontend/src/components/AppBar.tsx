import { Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";

function AppBar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if(userLoading){
    return <>
      <CircularProgress />
      </>
  }
  // const init = async () => {
  //   const response = await axios.get(`${BASE_URL}/admin/me`, {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });

  //   if (response.data.username) {
  //     setUseremail(response.data.username);
  //   }
  // };
  // useEffect(() => {
  //   init();
  // }, []);
  // console.log("useremail", useremail);
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={()=>{ navigate("/")}}>
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
                
                onClick={() => {
                  navigate("/addcourse");
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
                setUser({
                  isLoading: false,
                  userEmail: null
                })
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
        <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={()=>{navigate("/")}}>
          <Typography variant={"h6"}>Udemy</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AppBar;
