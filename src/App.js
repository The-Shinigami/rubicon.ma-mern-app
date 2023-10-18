import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Task from './component/task/task';
import Project from './component/project/project';
import Navbar from './component/navbar/navbar';
import { Provider } from 'react-redux';
import history from './store/util/history';
import configureStore from './store'
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ReactNotifications } from 'react-notifications-component';

function App() {
  const initialState = {
    project : {
      isLoading:false,
      projects:[]
    }
  };
const store = configureStore(initialState, history);

  return (
    <Provider store={store}>
  <BrowserRouter>
  <ReactNotifications />
  <Navbar />
  <Routes>  
     <Route path="task" element={<Task/>} />
     <Route path="/" element={<Project/>} />
     <Route path="project" element={<Project/>} />
   </Routes>
   </BrowserRouter>
   </Provider>
    
  );
}

export default App;
