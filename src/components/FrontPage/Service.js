import React from "react";


function Service({ title, description, onClick, isSelected }) {
  return (
    <div
      className={`service ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(title)}
    >
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}

export default Service;
