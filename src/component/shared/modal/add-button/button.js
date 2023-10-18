import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import './style.scss'
import { addProject, getProjects } from '../../../../store/project/actions';
import { addTask, getTasks } from '../../../../store/task/actions';
import { useDispatch,useSelector} from 'react-redux';
import FlagSVG from './Flag-svg';
import NotebookSVG from './Notebook';
function AddButton({title,formFields}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.get("project").projects);
  const isLoadingProject = useSelector((state) => state.get("project").isLoading);
  const [isLoading,setIsLoading] = useState(false);
  const [formFieldsCopie,setFormFieldsCopie] = useState(formFields);
  
  
  useEffect(() => {
    dispatch(getProjects())
  },[]);

  useEffect(() => {
    
    // Once projects are available, update the options for the "Project" select field
    if (projects!=undefined && title === 'Task') {
      setIsLoading(true)
      const projectOptions = projects.map((project) => ({
        id: project["_id"], // Adjust this to match your project ID
        value: project.label, // Adjust this to match your project name
      }));
      formFields.find((field) => field.name === 'project').options = projectOptions;
      setIsLoading(false)
      setFormFieldsCopie(formFields)
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
      dispatch(addTask(formData))
      dispatch(getTasks())
      break;
      case 'Project':
      dispatch(addProject(formData))
      dispatch(getProjects())
      break;
    }
    
  };
  return (
    <>
      
     { isLoading || isLoadingProject || projects === undefined  ?"loading...": 
     <>
     <Button className="add-button"  onClick={toggle}>
     <svg width={25} className="svg-icon"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
       New {title}
     </Button>
     <Modal isOpen={modal} toggle={toggle} >

        <ModalHeader toggle={toggle}>
         <div style={{fontSize:'35px'}}> 
          {title==='Project'?
          <FlagSVG/>
           :null}
            {title==='Task'?
            <NotebookSVG/>
           :null}
           {' Add New '+title}
          </div>
         <span style={{color:'#888888',fontSize:'18px'}}>Fill your {title} attributes</span>
        </ModalHeader>
        <ModalBody>
        
        <Form id='myForm' onSubmit={handleSubmit}>
          {
            isLoading ?"loading...": 
            formFieldsCopie.map((field, index) => (
              <FormGroup key={index}>
                <Label for={field.name}>{field.label}</Label>
                {field.type === 'select' ? (
                  <Input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name] || ''}
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
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                )}
              </FormGroup>
            ))
            
          }
            
                 
          
        
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" style={{backgroundColor:'white',color:'black',paddingLeft:'20px',paddingRight:'20px'}} onClick={toggle}>
            Cancel
          </Button>
          <Button type='submit' style={{backgroundColor:'#941feb',borderColor:'#941feb',paddingLeft:'20px',paddingRight:'20px'}} form="myForm" color="primary" onClick={toggle}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
     </>
     
     }
     
    </>
  );
}

export default AddButton;