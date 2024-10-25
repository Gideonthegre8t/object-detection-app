"use client"; // Marking this component as a client component

import Image from "next/image";
import { useEffect, useState } from "react";

function TimerSection() {
  const [timeLeft, setTimeLeft] = useState(29 * 60); // Set initial time to 29 minutes in seconds
  const [isVisible, setIsVisible] = useState(true); // State for toggling visibility

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // If time reaches 0, restart the timer
          return 29 * 60; // Restart to 29 minutes
        }
        return prevTime - 1; // Decrement the time
      });
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Toggle visibility of the timer
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="detection-top-right flex gap-3 mt-4 md:mt-8">
      <div className="flex gap-2 min-w-[140px] p-4 md:min-w-[178px] h-[36px] md:h-[44px] bg-[#ECE8FF] rounded-lg items-center">
        <Image
          src="/svg/timer.svg"
          alt="timer"
          width={24}
          height={24}
          className="h-auto"
        />
        <div className="flex gap-1 items-center">
          {isVisible && ( // Show timer only if isVisible is true
            <h2 className="text-customPurple text-[clamp(14px, 2vw, 18px)]">
              {formatTime(timeLeft)}
            </h2>
          )}
          <h3 className="text-customPurple text-[clamp(14px, 2vw, 18px)]">time left</h3>
        </div>
      </div>
      <div className="ml-1  flex items-center cursor-pointer" onClick={toggleVisibility}>
        <Image
          src="/svg/visible-eye.svg"
          alt="eye"
          width={24}
          height={24}
          className="h-auto mb-3"
        />
      </div>
    </div>
  );
}

export default TimerSection;
