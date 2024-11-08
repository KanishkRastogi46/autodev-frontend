import React from 'react';

export const Label = ({ children, ...props }) => {
  return (
    <label {...props}>
      {children}
    </label>
  );
};

export default Label;
