// components/Navbar/index.js

import React, { useState } from "react";
import { useLocation } from 'react-router-dom'

import Button from "../shared/navbar-button/button";
import './style.scss'
const Navbar = () => {
  const location = useLocation();

  const [activeButton, setActiveButton] = useState(location.pathname);
  const buttons = [
    { title: 'Projects',link:'/project', index: '/project' },
    { title: 'Tasks',link:'/task', index: '/task' },
  ];
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

 
	return (
		<div className="grid-container container">
    <h1 className="title">Rubicon Coding challenge</h1>
    <div className="button-container">
    {buttons.map((button, index) => (
        <Button
          key={index}
          title={button.title}
          link={button.link}
          isActive={activeButton === button.index?'active':''}
          onClick={() => handleButtonClick(button.index)}
        />
      ))}
    </div>
	  
		</div>
	);
};

export default Navbar;
