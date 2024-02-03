import React from 'react';

const Button = ({ children, className = "", ...rest }) => {
  const combinedClassName = `bg-primary text-white flex justify-center items-center rounded-lg  ${className}`;

  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
