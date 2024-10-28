// src/hooks/useBeforeUnload.js

import { useEffect } from 'react';

const useBeforeUnload = (message) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Prevent the default unload action
      event.returnValue = message; // Set the message for the alert (for some browsers)
      return message; // This returns the message for browsers that support it
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);
};

export default useBeforeUnload;
