import React from 'react';

const OptionCard = ({ title, description, img, onClickMove }) => {
  return (
    <div className="option-card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={img} alt={title} />
      </div>
      
    </div>
  );
};

export default OptionCard;


