import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const WebcamCapture = () => {
    const webcamRef = useRef(null);

    const captureFrame = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then(res => res.blob());

        const formData = new FormData();
        formData.append('frame', blob);

        axios.post('http://127.0.0.1:5000/detect', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            console.log(response.data); 
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={captureFrame}>Capture and Detect</button>
        </div>
    );
};

export default WebcamCapture;
