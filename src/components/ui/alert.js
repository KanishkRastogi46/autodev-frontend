import React from 'react';

export const Alert = ({ children, ...props }) => {
  return (
    <div {...props} className="alert">
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, ...props }) => {
  return (
    <div {...props} className="alert-description">
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, ...props }) => {
  return (
    <div {...props} className="alert-title">
      {children}
    </div>
  );
};

export default Alert;
