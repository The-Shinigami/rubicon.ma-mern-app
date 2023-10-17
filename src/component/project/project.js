import React from 'react'
import AddButton from '../shared/modal/add-button/button';

function Project() {

  const formFields = [
    {
      label: 'Label',
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: ['Active', 'Completed', 'On Hold'],
    },
    {
      label: 'Starting Date',
      name: 'starting_date',
      type: 'date',
    },
    {
      label: 'Ending Date',
      name: 'ending_date',
      type: 'date',
    }]
  return (
    <>
    <div className='grid'>
      <div className='add-button-element'>
        <AddButton title="Project" formFields = {formFields}></AddButton>
      </div>
      {/* <div className='content-container'>
        
      <h1>Project Page</h1>
      </div> */}

    </div>
    </>
  )
}

export default Project;
