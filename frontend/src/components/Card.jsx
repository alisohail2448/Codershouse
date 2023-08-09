import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, icon, children }) => {
  return (
    <div className="card flex flex-col justify-center items-center">
      <div className="cardHeading">
        {icon && <img src={`/images/${icon}.png`} alt={icon} />}
        {title && <h1 className="text-[22px] font-bold ml-[10px]">
          {title}
        </h1>}
      </div>
      {children}
    </div>
  );
};

export default Card;
