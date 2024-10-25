"use client"; // Marking this component as a client component
import { useState, useRef } from "react"; // Import useRef
import Gadgets from "../gadgets/Gadgets";

function SystemCheck() {
  const [gadgetActive, setGadgetActive] = useState(false);
  
  const mediaRecorderRef = useRef(null); // Use useRef for mediaRecorder
  const recordedChunksRef = useRef([]); // Use useRef for recordedChunks

  const handleButtonClick = async () => {
    try {
      setGadgetActive(true);
      // Set up the media recorder for video
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream); // Assign to the ref

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data); // Push to the ref
        }
      };

      mediaRecorderRef.current.start();

      // Stop recording after 5 seconds
      setTimeout(() => {
        mediaRecorderRef.current.stop(); // Stop using the ref
        setGadgetActive(false); // Revert gadget state after process
      }, 5000); // Assuming 5-second recording

    } catch (error) {
      console.error("Error accessing media devices.", error);
      setGadgetActive(false); // Change gadget state on error
    }
  };

  return (
    <article className="detection-body container mx-auto bg-customWhite mt-6 w-full max-w-[832px] min-h-[523px] rounded-[20px] px-9 pt-10 pb-8">
      <h1 className="text-[20px] font-[500] text-[#000000]">System check</h1>
      <p className="text-[#4A4A68] text-[14px] font-normal leading-[22px] tracking-[-0.24px] mt-2">
        We utilize your camera image to ensure fairness for all participants, and we also employ both your camera and microphone for a video questions where you will be prompted to record a response using your camera or webcam, so it&apos;s essential to verify that your camera and microphone are functioning correctly and that you have a stable internet connection. To do this, please position yourself in front of your camera, ensuring that your entire face is clearly visible on the screen. This includes your forehead, eyes, ears, nose, and lips. You can initiate a 5-second recording of yourself by clicking the button below.
      </p>
      <Gadgets active={gadgetActive} />
    </article>
  );
}

export default SystemCheck;
