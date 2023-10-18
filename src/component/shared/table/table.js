import React from 'react';
import { Table } from 'reactstrap';
import UpdateButton from '../modal/update-button/button.js'

import './style.scss';
import RemoveButton from '../modal/remove-button/button.js';

export default function CustomeTable({title, data, columns,formFields }) {

    
  

  return (
    <>
      <Table borderless>
        <thead>
          <tr className='row-header'>
            {columns.map((column, index) => (
              <th style={{ color: 'gray',whiteSpace:"nowrap" }} key={index}>
                {column.label}
              </th>
            ))}
            <th style={{ color: 'gray',whiteSpace:"nowrap" }}>
             actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className='row-element'>
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={{padding:"15px"}}>
                  {
                      column.name === 'starting_date' || column.name === 'ending_date'?
                      <svg  width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#888888" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                      :null
                    }
                    &nbsp;
                  {column.format !== undefined
                    ? <span className={column.className!== undefined ?column.className:null}>{formatData(item[column.name], column.format)}</span>

                    : item[column.name]}

                    
                </td>
              ))}
              <td style={{padding:"15px"}}>
                <table width={70}>
                    <tbody>
                    <tr>
                        <td>  
                            <UpdateButton title={title} formFields={formFields} data={item}></UpdateButton>
                        </td>
                        <td>            
                            <RemoveButton title={title}  dataId={item['_id']}></RemoveButton>
                       </td>
                    </tr>  
                    </tbody>
                    
                </table>
            

          </td>
            </tr>

          ))}
          
        </tbody>
      </Table>
    </>
  );
}

function formatData(data, format) {
  // You can implement date formatting or other formatting logic here
  if (format === 'dd/mm/yy' && data) {
    let date = new Date(data)
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is 0-based
    const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

    return `${day}/${month}/${year}`;
  }
  if(format === 'project.label'){
return data.label
  }

  // Add more formatting logic for other formats if needed

  return data; // Return the original data if no format is specified
}
