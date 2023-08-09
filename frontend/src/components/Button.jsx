import React from "react";

const Button = ({ title, icon, onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <button className="btn" onClick={onClick}>
        <span >{title}</span>
        <img src={`/images/${icon}.png`} className="ml-[10px]" alt={icon} />
      </button>
    </div>
  );
};

export default Button;
