"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function Gadgets() {
  const [imageSrc, setImageSrc] = useState(null);
  const [isMediaActive, setIsMediaActive] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [borderColor, setBorderColor] = useState("#755AE2");
  const [gadgetSVGs, setGadgetSVGs] = useState([
    "/svg/webcam.svg",
    "/svg/speed.svg",
    "/svg/webcam.svg",
    "/svg/lighting.svg",
  ]);
  const [showDesktopDetected, setShowDesktopDetected] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        console.log("Models loaded");
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face-api.js models:", error);
      }
    };
    loadModels();
  }, []);

  const getUserMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsMediaActive(true);
        console.log("Media stream activated");
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const detectFaceAndCapture = async () => {
    if (!modelsLoaded) {
      console.log(
        "Models are not fully loaded yet. Waiting for model to load..."
      );
      return;
    }

    const video = videoRef.current;
    if (video) {
      const faceDetected = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (faceDetected) {
        console.log("Face detected");
        setBorderColor("green");
        setShowTryAgain(false);
        captureImage();
      } else {
        console.log(
          "No face detected. Please ensure your face is clearly visible."
        );
        setBorderColor("red");
        setShowTryAgain(true);
      }
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const width = video.videoWidth;
      const height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);
      const imageData = canvas.toDataURL("image/png");
      setImageSrc(imageData);

      // Update gadget SVGs after capturing the image
      setGadgetSVGs([
        "/svg/mic-active.svg",
        "/svg/danger.svg",
        "/svg/mic-active.svg",
        "/svg/lighting-active.svg",
      ]);

      setShowDesktopDetected(true);
      startRecording();
    }
  };

  const startRecording = async () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(videoBlob);
        console.log("Recording stopped and video blob created");
        setShowModal(true); // Show modal after recording stops
      };

      mediaRecorder.start();
      setRecording(true); // Set recording state to true
      console.log("Recording started");
    } else {
      console.error("Stream not available for recording");
    }
  };

  const handleButtonClick = async () => {
    if (!isMediaActive) {
      await getUserMediaStream();
    }
    if (!imageSrc) {
      detectFaceAndCapture();
    }
  };

  const handleContinueClick = () => {
    setShowModal(true); // Show modal when "Continue" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  useEffect(() => {
    // Cleanup function to stop video tracks
    return () => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        const stream = currentVideoRef.srcObject;
        if (stream) {
          // Stop all tracks in the stream
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
        // Clear the srcObject to prevent memory leaks
        currentVideoRef.srcObject = null;
      }
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div
          className="cam-view w-[275px] h-[168px] border rounded-[10px] relative"
          style={{
            borderColor,
            borderWidth: "3px",
            borderStyle: "solid",
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-[10px]"
            autoPlay
            muted
            style={{ display: isMediaActive ? "block" : "none" }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {recording && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              <span className="text-2xl">Recording...</span>
            </div>
          )}
          {showDesktopDetected && (
            <div className="absolute top-0.5 left-2 text-white bg-red-600 bg-opacity-50 p-1 rounded">
              Desktop detected
            </div>
          )}
          {showTryAgain && (
            <div className="absolute bottom-2 left-2 text-white bg-red-600 bg-opacity-50 p-1 rounded">
              Try again
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1 md:gap-1 m-2">
          {gadgetSVGs.map((src, index) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="w-[95px] h-[71px] rounded-[10px] bg-[#F5F3FF] p-1 flex flex-col items-center">
                <Image
                  src={src}
                  alt={`Gadget ${index}`}
                  width={65}
                  height={71}
                  className="h-auto"
                />
                <h3 className="text-[10px] font-[400] leading-[13.02px] tracking-[-0.24px] text-center mt-0.5">
                  {["Webcam", "Speed", "Gadget mic", "Lighting"][index]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-left">
        <button
          onClick={imageSrc ? handleContinueClick : handleButtonClick}
          className="w-[207px] h-[44px] bg-[#755AE2] text-white rounded-[8px] flex items-center justify-center"
        >
          {imageSrc ? "Continue" : "Take Picture"}
        </button>
      </div>

      {/* Modal for instructions */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-[18px] w-full max-w-[472px] h-auto"
            style={{ height: "314px" }}
          >
            <div className="flex justify-between bg-[#755AE2] w-full rounded-t-[18px] p-4">
              <h3 className="mt-2 ml-3 text-white font-medium text-[16px] leading-[23px] tracking-[-0.24px]">
                Start assessment
              </h3>
              <button
                onClick={handleCloseModal}
                className="bg-[#F5F3FF33] w-[75px] h-[32px] text-white rounded-[9px] font-nunito"
              >
                Close
              </button>
            </div>
            <div className="bg-[#F5F3FF] py-6 pb-10">
              <div className="flex flex-col gap-3 text-[#755AE2] font-nunito text-center">
                <h3 className="font-[500] text-[20px] leading-[23px] tracking-[-0.24px] mt-5">
                  Proceed to start assessment
                </h3>
                <div className="flex justify-center items-center">
                  <p className="text-[14px] font-[400] leading-[18.23px] tracking-[-0.24px] text-center text-[#675E8B] w-[335px] h-[54px]">
                    Kindly keep to the rules of the assessment and sit up, stay
                    in front of your camera/webcam and start your assessment.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end rounded-b-[20px]">
              <button
                onClick={handleCloseModal}
                className="mt-4 mr-8 w-[140px] h-[44px] bg-[#755AE2] text-white rounded-[10px] flex items-center justify-center"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gadgets;