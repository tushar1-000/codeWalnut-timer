import React from "react";


interface ReusableButtonProps {
    title: string;
    onClick: () => void;
    variant?: 'primary' | 'danger' | 'addBtn'; // Allows different styles for primary and secondary buttons
    children: React.ReactNode;
  }


function ReusableButton({onClick,title,children , variant = "primary"}:ReusableButtonProps) {

    const buttonStyles = {
        primary: ' hover:bg-blue-50 text-blue-500 ',
        danger: ' hover:bg-red-50 text-red-500  ',
        addBtn :'flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg'
      };
  return (
    <button
      onClick={onClick}
      className= {`p-2 rounded-full transition-colors ${buttonStyles[variant]}`}
      title={title}
    >
      {children}
    </button>
  );
}

export default ReusableButton;
