import React from 'react';

const InputPage = ({title, description, img}) => {
  return (
    <div className="input-card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={img} alt={title} />
      </div>
      
    </div>
  );
}

export default InputPage;


