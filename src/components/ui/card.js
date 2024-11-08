import React from 'react';

export const Card = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// Export additional card components as needed
export const CardDescription = ({ children, ...props }) => <div {...props}>{children}</div>;
export const CardFooter = ({ children, ...props }) => <div {...props}>{children}</div>;
export const CardHeader = ({ children, ...props }) => <div {...props}>{children}</div>;
export const CardTitle = ({ children, ...props }) => <div {...props}>{children}</div>;

export default Card;
