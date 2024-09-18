import React, { Children } from 'react';
interface Contextmenu {
    positionX?:Number
    positionY?:Number
    children?:React.ReactNode;
}
const Contextmenu = ({ positionX, positionY ,children }: Contextmenu) => {
  return (
    <div
      className="p-3  bg-white border shadow-md rounded-md absolute z-50"
      style={{
        top: `${positionY}px`,
        left: `${positionX}px`,
      }}
    >
      {children}
    </div>
  );
}

export default Contextmenu;
