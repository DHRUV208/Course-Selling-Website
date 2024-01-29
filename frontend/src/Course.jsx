import { Button, Card, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Course} from "./Courses";
import {AddCourse} from "./AddCourse";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';

function Coursei(){
    let {courseId} = useParams();
    console.log("main course");
    const setCourses = useSetRecoilState(coursesState);
    const [course, setCourse] = useState(null);

    useEffect(()=>{
        
      axios.get("http://localhost:3005/admin/course/"+ courseId, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then((res)=>{
        setCourse(res.data.course)
      })
    }, [])

    if(!course){
      return (
          <div>
              <CircularProgress>Loading..</CircularProgress>
          </div>
      )
  }


    return (
        <div>
          <GrayTopper title={course.title} />
          <Grid  container>
            <Grid item lg={8} md={12} sm={12}>
              <UpdateCard course={course} setCourse={setCourse} />

            </Grid>
            <Grid item lg={4} md={12} sm={12}>
              <CourseCard course={course} />

            </Grid>
          </Grid>
        </div>
    )
}

function GrayTopper({title}){
  return (
    <div style={{
      height: 250,
      background: "#212121",
      top: 0,
      width: "100vw",
      zIndex: 0,
      marginBottom: -250
    }}>
      <div style={{
        height: 250,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <div>
      <Typography textAlign={"center"} variant={"h3"}style={{color: "white", fontWeight: 600}}>{title}</Typography>
      </div>
      </div>
    </div>
  )
}

function UpdateCard ({course, setCourse}){
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);
    const [courses, setCourses] = useRecoilState(coursesState);
   
    
      console.log("update card render");

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ width: 600, marginTop: 200 }}>
              <div style={{padding: 20}}>
              <TextField
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth
                lable="Title"
                variant="outlined"
                value={title}
              />
      
              <TextField
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth
                lable="Description"
                variant="outlined"
                value={description}

              />
      
              <TextField
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                fullWidth
                lable="Image Link"
                variant="outlined"
                value={image}

             />
              <TextField
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                fullWidth
                lable="Price"
                variant="outlined"
                value={price}

              />
      
              <Button
                variant="contained"
                onClick={ async () => {

                  axios.put("http://localhost:3005/admin/courses/" + course._id, {
                    title,
                    description,
                    imageLink: image,
                    published: true,
                    price
                  }, {
                    headers:{
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                  });

                  let updatedCourse = {
                    _id: course._id,
                    title,
                    description,
                    imageLink: image,
                    price
                  };
                  setCourse(updatedCourse);

                 
                }}
              >
               Update Course
              </Button>
              </div>
              
            </Card>
          </div>
        );
        // <Card style={
        //     {
        //         margin: 10,
        //         width: 300,
        //         minHeight:200
        //     }
        // }>
        //     {props.course.title}
        // </Card>

}

function CourseCard ({course}){
    const courses = useRecoilValue(coursesState);
    

    
    console.log("coursecard render")
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 50, width: "100%"}}>
            <Card style= {{
                margin:10,
                width: 300,
                minHeight: 200,
                borderRadius: 20,
                marginRight: 50,
                paddingBottom: 15,
                zindex: 2
            }}>
                <img src={course.imageLink} style={{width: 350}} />
            <div style={{marginLeft: 10}}>
            <Typography textAlign={"center"} variant="h5">
                    {course.title}
                </Typography>
            <Typography style={{color: "Gray"}} variant="subtitle2">
                    Price
                </Typography>
                <Typography  variant="subtitle1">
                  <b> Rs {course.price} </b>
                </Typography>
            </div>
                
                
                
                
            </Card>

        </div>
    )
}

export default Coursei;

const coursesState = atom({
    key: 'coursesState',
    default: ''
})