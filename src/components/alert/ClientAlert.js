"use client";

import useBeforeUnload from '../../hooks/useBeforeUnload';

export default function ClientAlert() {
  const alertMessage = "You have not submitted. Are you sure you want to leave?";

  // Use the hook with the alert message
  useBeforeUnload(alertMessage);

  const startCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // Camera is now active, the alert will show if the user tries to leave
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

 
}
