import React, { useState, useRef } from 'react';

  
export default function VideoRecorder({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        onRecordingComplete(blob);
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="relative aspect-square w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover" />
      </div>
      {!isRecording && !videoBlob && (
        <button onClick={startRecording} className="flex bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Iniciar Grabación
        </button>
      )}
      {isRecording && !isPaused && (
        <>
          <button onClick={pauseRecording} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">
            Pausar
          </button>
          <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">
            Detener Grabación
          </button>
        </>
      )}
      {isRecording && isPaused && (
        <button onClick={resumeRecording} className="left-0 right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Reanudar
        </button>
      )}
      {videoBlob && (
        <video src={URL.createObjectURL(videoBlob)} controls className="w-full aspect-square object-cover rounded-lg" />
      )}
    </div>
  );
};
