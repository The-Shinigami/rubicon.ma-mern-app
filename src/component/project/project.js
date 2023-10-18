import React, { useEffect } from 'react';
import AddButton from '../shared/modal/add-button/button';
import CustomeTable from '../shared/table/table';
import { useDispatch,useSelector } from 'react-redux';
import { getProjects } from '../../store/project/actions';
import './style.scss'
    
function Project({props}) {
  // Define your formFields here
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
      options: [
      {
        id:'Active',
        value:'Active'
      }, 
      { id:'Completed',
        value:'Completed'
      }, 
      { 
        id:'On Hold',
        value:'On Hold'
      }],
    },
    {
      label: 'Starting Date',
      name: 'starting_date',
      type: 'date'
    },
    {
      label: 'Ending Date',
      name: 'ending_date',
      type: 'date',
    }
  ];
  const columns =[
    {
      label: 'Label',
      name: 'label',
    },
    {
      label: 'Description',
      name: 'description',
    },
    {
      label: 'Status',
      name: 'status',
    },
    {
      label: 'Started At',
      name: 'starting_date',
      format:'dd/mm/yy'
    },
    {
      label: 'Ended At',
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
  const projects = useSelector((state) => state.get("project").projects)
  const isLoading = useSelector((state) => state.get("project").isLoading)
  
  useEffect(()=>{
  dispatch(getProjects())
  },[])

 return (
    <div className='grid container'>
      <div className='add-button-element'>
        <AddButton title="Project" formFields={formFields} />
      </div>
      <div style={{width:"100%"}}>
        {
           isLoading || projects===undefined ? "loading...":
           <CustomeTable title="Project" data={projects} columns={columns} formFields={formFields}></CustomeTable>
       }
        

      </div>

      
      
    </div>
  );
}



export default Project;
