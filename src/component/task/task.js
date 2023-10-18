import React, { useEffect } from 'react';
import AddButton from '../shared/modal/add-button/button';
import './style.scss'
import { useDispatch, useSelector } from "react-redux";
import CustomeTable from '../shared/table/table';
import { getTasks } from '../../store/task/actions';
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
  const columns = [
    {
      label: 'Label',
      name: 'label'
    },
    {
      label: 'Description',
      name: 'description'
    },
    {
      label: 'Project',
      name: 'project',
      format:'project.label'
    },
    {
      label: 'Started at',
      name: 'starting_date',
      format:'dd/mm/yy'
    },
    {
      label: 'Ended at',
      name: 'ending_date',
      format:'dd/mm/yy'
    },
    {
      label: 'Created At',
      name: 'created_at',
      format:'dd/mm/yy',
      className:'blueBoxStyle'
    },
    {
      label: 'Updated At',
      name: 'updated_at',
      format:'dd/mm/yy',
      className:'orangeBoxStyle'
    }
  ]

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.get("task").tasks);
  const isLoadingTask = useSelector((state) => state.get("task").isLoading);

  useEffect(() => {
    dispatch(getTasks())
  },[]);



  return (
    <div className="container">
    
      <div className='grid'>
      <div className='add-button-element'>
        <AddButton title="Task" formFields = {formFields}></AddButton>
      </div>
      <div style={{width:"100%"}}>
        {
           isLoadingTask || tasks===undefined ? "loading...":
           <CustomeTable title="Task" data={tasks} columns={columns} formFields={formFields}></CustomeTable>
       }
        

      </div>

    </div>
  
    </div>
  );

}

export default Task;
