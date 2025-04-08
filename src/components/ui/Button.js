import React from "react";

const Button = ({ children, variant = "primary", size = "md", onClick }) => {
  const buttonClass = `btn btn-${variant} btn-${size}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;