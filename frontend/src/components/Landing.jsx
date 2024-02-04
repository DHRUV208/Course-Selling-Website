import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading.js";

export const Landing = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Coursera Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvdXJzZXN8ZW58MHx8MHx8fDA%3D"} width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
};
