import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap';
import './style.scss'
function AddButton({title,formFields}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  
  const [formData, setFormData] = useState({});
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with the formData object
    console.log(formData);
  };
  return (
    <>
      <Button className="add-button"  onClick={toggle}>
      <svg width={25} className="svg-icon"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        New {title}
      </Button>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add New {title}</ModalHeader>
        <ModalBody>
        
        <Form id='myForm' onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
        <FormGroup key={index}>
          <Label for={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            required = {field.required}
            value={formData[field.name] || ''}
            onChange={handleChange}
          >
            {field.options!== undefined?
            field.options.map(
              (option,index) =>(
                <option key={index} value={option}>
                 { option}
                </option>
              )
            ):null
          }
          </Input>
          
        </FormGroup>
      ))}
       
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button type='submit' form="myForm" color="primary" onClick={toggle}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddButton;