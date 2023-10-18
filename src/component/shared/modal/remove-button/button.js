import React, {  useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import './style.scss'
import {  deleteProject, getProjects } from '../../../../store/project/actions';
import {  deleteTask, getTasks} from '../../../../store/task/actions';
import { useDispatch} from 'react-redux';

function RemoveButton({title,dataId}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    
    switch(title){
      case 'Task':
      dispatch(deleteTask(dataId))
      dispatch(getTasks())
      break;
      case 'Project':
      dispatch(deleteProject(dataId))
      dispatch(getProjects())
      break;
    }
   
    
  };

  

  return (
    <>
   
      <Button className='no-style' onClick={toggle}>
      <svg width={20} className='svg-icon-remove' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z" fill="#000000"></path> <path d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z" fill="#000000"></path> </g></svg>
      </Button>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Remove {title}</ModalHeader>
        <ModalBody>
        Are you sure you want to delete this {title} !!
        
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" style={{backgroundColor:'white',color:'black',paddingLeft:'20px',paddingRight:'20px'}} onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" style={{backgroundColor:'#941feb',borderColor:'#941feb',paddingLeft:'20px',paddingRight:'20px'}} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RemoveButton;