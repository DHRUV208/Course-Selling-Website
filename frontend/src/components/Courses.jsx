import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses(){

    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        
        function cb2(data){
            setCourses(data.courses);
        }

        function cb(res){
            res.json().then(cb2);
        }
        fetch ("http://localhost:3005/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(cb)
    }, [])

    
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            Courses
            {courses.map((course)=>{
              return  <Course course={course}/>
            })}
        </div>
    )
}

export function Course ({course}){
    // const navigate = useNavigate();
    return (
        <Card style={{
            border: "2px solid black",
            margin: 10,
            width:300,
            minHeight: 200 

        }}>
           <Typography textAlign={"center"} variant="h5"> {course.title} </Typography>
           <Typography textAlign={"center"} variant="subtitle1"> {course.description}</Typography>
            <img src={course.imageLink} style={{width: 300}} alt="" />
            <Button variant="contained" size="large" onClick={()=>{
                // navigate("/course/"+ course._id)
                console.log("12");
            }}>Edit</Button>
            </Card>
    )
}

export default Courses;