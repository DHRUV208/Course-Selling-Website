import AddCourse from "./AddCourse";
import AppBar from "./AppBar"
import Register from "./Register"
import Login from "./login"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  return (
    <div style={{width: "100vw", height: "100vh", backgroundColor: "#eeeee"}}>
    <Router>
    <AppBar /> 

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
    </div>
  )
}

function BigText (){
  return <h1>Hi There</h1>
}

function TodoApp(){
  return <div>
    Todo App
  </div>
}
export default App
