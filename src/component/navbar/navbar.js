// components/Navbar/index.js

import React, { useState } from "react";

import Button from "../shared/navbar-button/button";
import './style.scss'
const Navbar = () => {
  const [activeButton, setActiveButton] = useState(0);
  const buttons = [
    { title: 'Projects',link:'/project', index: 0 },
    { title: 'Tasks',link:'/task', index: 1 },
  ];
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
	return (
		<div className="grid-container">
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
