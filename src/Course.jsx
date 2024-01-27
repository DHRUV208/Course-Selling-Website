import { Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Course} from "./Courses";
import {AddCourse} from "./AddCourse";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Coursei(){
    let {courseId} = useParams();
    console.log("main course");
    const setCourses = useSetRecoilState(coursesState);
    useEffect(()=>{
        
        function cb2(data){
            setCourses(data.courses);
        }

        function cb(res){
            res.json().then(cb2);
        }
        fetch ("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(cb)
    }, [])



    return (
        <div>
            <CourseCard courseId={courseId} />
            <UpdateCard courseId={courseId} />
        </div>
    )
}

function UpdateCard (props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [courses, setCourses] = useRecoilState(coursesState);
    let course = null;
    for(let i =0;i< courses.length;i++){
        if(courses[i].id == props.courseId){
            course = courses[i]
        }
    }
    if(!course){
        return (
            <div>
                <CircularProgress>Loading..</CircularProgress>
            </div>
        )
    }
      console.log("update card render");

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ width: "400", padding: 20 }}>
              <TextField
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth
                lable="Title"
                variant="outlined"
              ></TextField>
      
              <TextField
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth
                lable="Description"
                variant="outlined"
              ></TextField>
      
              <TextField
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                fullWidth
                lable="Image Link"
                variant="outlined"
              ></TextField>
      
              <Button
                variant="contained"
                onClick={() => {
                  function cb2(data) {
                    alert("course updated");
                    let updatedCourses = [];
                    for(let i =0; i<courses.length;i++ ){
                        if(courses[i].id == props.courseId){
                            updatedCourses.push( {
                                id: props.courseId,
                                title: title,
                                description: description,
                                imageLink: image
                            })
                        } else {
                            updatedCourses.push(courses[i]);
                        }
                    }
                    setCourses(updatedCourses);
                    console.log(data);
                  }
      
                  function cb(res) {
                    res.json().then(cb2);
                  }
                  fetch("http://localhost:3000/admin/courses/"+ props.courseId, {
                    method: "PUT",
                    body: JSON.stringify({
                      title,
                      description,
                      imageLink: image,
                    }),
                    headers: {
                      "Content-type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }).then(cb);
                }}
              >
               Update Course
              </Button>
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

function CourseCard (props){
    const courses = useRecoilValue(coursesState);
    let course = null;
    for(let i =0;i< courses.length;i++){
        if(courses[i].id == props.courseId){
            course = courses[i]
        }
    }

    if(!course){
        return (
            <div>
               < CircularProgress />
            </div>
        )
    }
    console.log("coursecard render")
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card style= {{
                margin:10,
                width: 300,
                minHeight: 200
            }}>
                <Typography textAlign={"center"} variant="h5">
                    {course.title}
                </Typography>
                
                <Typography textAlign={"center"} variant="subtitle1">
                    {course.description}
                </Typography>
                <img src={course.imageLink} alt="" />
                
            </Card>

        </div>
    )
}

export default Coursei;

const coursesState = atom({
    key: 'coursesState',
    default: ''
})