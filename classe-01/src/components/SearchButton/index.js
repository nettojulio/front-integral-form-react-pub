import React from "react";
import './style.css';


function Button({ children }) {
  return (
    <button type="submit" className="button">{children}</button>
  );
}

export default Button;
