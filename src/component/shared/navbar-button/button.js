import React  from 'react'
import { Link } from 'react-router-dom';
import './style.scss'; 

export default function Button({ title, link, isActive,onClick }) {
   
    
  return (
    <>
         <Link 
         to={link}
         className={`button ${isActive ? 'active' : ''}`}
         onClick={onClick}
         >{title}</Link>
    </>
  )
}
