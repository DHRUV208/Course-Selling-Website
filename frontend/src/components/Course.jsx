import {
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "./Courses";
import { AddCourse } from "./AddCourse";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axios from "axios";
import { BASE_URL } from "../config";
import {
  courseImage,
  coursePrice,
  courseTitle,
  isCourseLoading,
} from "../store/selectors/course";
import { courseState } from "../store/atoms/course";

function Coursei() {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({isLoading: false, course: res.data.course});
      })
      .catch(e=>{
        setCourse({isLoading: false, course: null})
      });
  }, []);

  if (courseLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            textAlign={"center"}
            variant={"h3"}
            style={{ color: "white", fontWeight: 600 }}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);

  console.log("update card render");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant="outlined" style={{ width: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update Course Details
          </Typography>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            lable="Title"
            variant="outlined"
            value={title}
            style={{ marginBottom: 10 }}
          />

          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            lable="Description"
            variant="outlined"
            value={description}
            style={{ marginBottom: 10 }}
          />

          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth
            lable="Image Link"
            variant="outlined"
            value={image}
            style={{ marginBottom: 10 }}
          />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth
            lable="Price"
            variant="outlined"
            style={{ marginBottom: 10 }}
            value={price}
          />

          <Button
            variant="contained"
            onClick={async () => {
              axios.put(
                "${BASE_URL}/admin/courses/" + courseDetails.course._id,
                {
                  title,
                  description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );

              let updatedCourse = {
                _id: courseDetails.course._id,
                title,
                description,
                imageLink: image,
                price,
              };
              setCourse({ course: updatedCourse, isLoading: false });
            }}
          >
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard({ course }) {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const price = useRecoilValue(coursePrice);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zindex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }} />
        <div style={{ marginLeft: 10 }}>
          <Typography textAlign={"center"} variant="h5">
            {title}
          </Typography>
          <Typography style={{ color: "Gray" }} variant="subtitle2">
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b> Rs {price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Coursei;
