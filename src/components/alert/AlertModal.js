// src/components/AlertModal.js

"use client"; // Make this a client component

export default function AlertModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 md:max-w-md text-center">
        <p className="text-lg md:text-xl font-semibold text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
}
