import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import './style.scss'
import {  getProjects, updateProject } from '../../../../store/project/actions';
import { getTasks, updateTask } from '../../../../store/task/actions';
import { useDispatch,useSelector } from 'react-redux';
import FlagSVG from '../add-button/Flag-svg';
import NotebookSVG from '../add-button/Notebook';

function UpdateButton({title,formFields,data}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.get("project").projects)
  const isLoading = useSelector((state) => state.get("project").isLoading)

  useEffect(()=>{
        setFormData(data)
  },[])
  useEffect(() => {
    // Once projects are available, update the options for the "Project" select field
    if (projects!==undefined && title === 'Task') {
      const projectOptions = projects.map((project) => ({
        id: project["_id"], // Adjust this to match your project ID
        value: project.label, // Adjust this to match your project name
      }));
      formFields.find((field) => field.name === 'project').options = projectOptions;
    }
  }, [projects]);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    switch(title){
      case 'Task':
      dispatch(updateTask(formData))
      dispatch(getTasks())
      break;
      case 'Project':
      dispatch(updateProject(formData))
      dispatch(getProjects())
      break;
    }
   
    
  };

  const formatData = (data,name) => {
    if(name === 'starting_date' || name === 'ending_date' ){
        let date = new Date(data)
        const day = String(date.getDate()).padStart(2, '0'); // Get day with 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month with 2 digits
        const year = date.getFullYear().toString(); // Get the last 2 digits of the year
    
        return `${year}-${month}-${day}`;
    }
    return data
  }
  const formatDataWithOptions = (data,name) => {
    if(name==='project' && data !== undefined && projects!== undefined){
        return data['_id']
    }
    return data
  }

  return (
    <>
   
      <Button className='no-style' onClick={toggle}>
      <svg width={20} className='svg-icon-update' fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.7,5.2a1.024,1.024,0,0,1,0,1.448L18.074,9.276l-3.35-3.35L17.35,3.3a1.024,1.024,0,0,1,1.448,0Zm-4.166,5.614-3.35-3.35L4.675,15.975,3,21l5.025-1.675Z"></path></g></svg>      </Button>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>
          <div style={{fontSize:'35px'}}> {title==='Project'?
          <FlagSVG/>
           :null}
            {title==='Task'?
            <NotebookSVG/>
           :null}
           {' Update '+title}</div>
         <span style={{color:'#888888',fontSize:'18px'}}>Change your {title} attributes</span></ModalHeader>
        <ModalBody>
        
        <Form id='myForm' onSubmit={handleSubmit}>
        { isLoading || projects===undefined ? "loading...":
        formFields.map((field, index) => (
            <FormGroup key={index}>
              <Label for={field.name}>{field.label}</Label>
              {field.type === 'select' ? (
                <Input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formatDataWithOptions(formData[field.name],field.name) || ''}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}...</option>
                  {field.options !== undefined
                    ? field.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.value}
                        </option>
                      ))
                    : null}
                </Input>
              ) : (
                <Input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formatData(formData[field.name],field.name) || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              )}
            </FormGroup>
          ))}
          
        
       
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary"style={{backgroundColor:'white',color:'black',paddingLeft:'20px',paddingRight:'20px'}} onClick={toggle}>
            Cancel
          </Button>
          <Button type='submit' style={{backgroundColor:'#941feb',borderColor:'#941feb',paddingLeft:'20px',paddingRight:'20px'}} form="myForm" color="primary" onClick={toggle}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UpdateButton;