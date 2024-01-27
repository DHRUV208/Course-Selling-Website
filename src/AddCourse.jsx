import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";

export function AddCourse() {
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
              alert("course added");
              console.log(data);
            }

            function cb(res) {
              res.json().then(cb2);
            }
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
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
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
