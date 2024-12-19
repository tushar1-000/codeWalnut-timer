import { toast } from "sonner";
import { useEffect, useState } from "react";

type ToastPosition = "bottom-right" | "top-right";

export const useToast = () => {
  const [toastPosition, setToastPosition] =  useState < ToastPosition >( "bottom-right");


  //screen size and update toast position 
  useEffect(() => {
    const updateToastPosition = () => {
      if (window.innerWidth <= 768) {
        setToastPosition("bottom-right");
      } else {
        setToastPosition("top-right"); 
      }
    };

  
    updateToastPosition();

  
    window.addEventListener("resize", updateToastPosition);

    return () => {
      window.removeEventListener("resize", updateToastPosition);
    };
  }, []);

  // Method to show a success toast
  const showSuccessToast = (
    message: string,
    action?: { label: string, onClick: () => void }
  ) => {
    toast.success(message, {
      duration: 5000,
      position: toastPosition,
      action,
    });
  };

  // Method to show an error toast
  const showErrorToast = (
    message: string,
    action?: { label: string, onClick: () => void }
  ) => {
    toast.error(message, {
      duration: 5000,
      position: toastPosition,
      action,
    });
  };

  // Expose methods and position
  return { showSuccessToast, showErrorToast, toastPosition };
};
