import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Task from './component/task/task';
import Project from './component/project/project';
import Navbar from './component/navbar/navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   
  <BrowserRouter>
  <Navbar />
  <Routes>  
     <Route path="/task" element={<Task/>} />
     <Route path="/" element={<Project/>} />
     <Route path="project" element={<Project/>} />
   </Routes>
   </BrowserRouter>

    
  );
}

export default App;
