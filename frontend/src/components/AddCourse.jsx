import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
export function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

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

        <TextField
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          fullWidth
          lable="Image Link"
          variant="outlined"
        ></TextField>

        <Button
          variant="contained"
          onClick={ async () => {
           await axios.post("http://localhost:3005/admin/courses", {
              title,
              description,
              imageLink: image,
              published: true,
              price
            },
            {
              headers: {
                "Authorization": "Bearer "+ localStorage.getItem("token")
              }
            });
           alert("course added successfully");
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
