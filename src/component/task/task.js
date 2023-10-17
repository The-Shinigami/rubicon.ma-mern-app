import React from 'react';
import AddButton from '../shared/modal/add-button/button';
import './style.scss'
function Task() {
  const formFields = [
    {
      label: 'Label',
      name: 'label',
      placeholder: 'Write a label...',
      type: 'text',
    },
    {
      label: 'Description',
      name: 'description',
      placeholder: 'Write a description...',
      type: 'textarea',
    },
    {
      label: 'Project',
      name: 'project',
      placeholder: 'Select a project...',
      type: 'select',
      options :[]
    },
    {
      label: 'Started at',
      name: 'starting_date',
      placeholder: 'Select a starting date...',
      type: 'date',
    },
    {
      label: 'Ended at',
      name: 'ending_date',
      placeholder: 'Select an ending date...',
      type: 'date',
    },
  ];

  return (
    <>
    <div className='grid'>
      <div className='add-button-element'>
        <AddButton title="Task" formFields = {formFields}></AddButton>
      </div>
      {/* <div className='content-container'>
        
      <h1>Task Page</h1>
      </div> */}

    </div>
    </>
  );

}

export default Task;
