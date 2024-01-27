import { Button, Card, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Course} from "./Courses";
import {AddCourse} from "./AddCourse";

function Coursei(){
    let {courseId} = useParams();
    const [courses, setCourses] = useState([]);
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

    let course;
    for(let i =0;i<courses.length;i++){
        if(courses[i].id == courseId){
            course = courses[i];

        }
    }

    if(!course){
        return (
            <div>
               Loading ...
               <br /><br />
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <Course course={course}/>
            <UpdateCard course={course} setCourses={setCourses} courses={courses} />
        </div>
    )
}

function UpdateCard (props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
        
      
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
                    for(let i =0; i<props.courses.length;i++ ){
                        if(props.courses[i].id == props.course.id){
                            updatedCourses.push( {
                                id: props.course.id,
                                title: title,
                                description: description,
                                imageLink: image
                            })
                        } else {
                            updatedCourses.push(props.courses[i]);
                        }
                    }
                    props.setCourses(updatedCourses);
                    console.log(data);
                  }
      
                  function cb(res) {
                    res.json().then(cb2);
                  }
                  fetch("http://localhost:3000/admin/courses/"+ props.course.id, {
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
export default Coursei;