
// import { useState, useRef, useEffect } from 'react';
// // נייבא את קובץ העיצוב
// import VoiceInterface from './SimulationDashboard';


// //---------------------------------------------------------------
// import { io } from 'socket.io-client';
// //---------------------------------------------------------------

// export const AudioStreamer = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const mediaRecorderRef = useRef(null);
//     const streamRef = useRef(null);
//     const socketRef = useRef(null);
//     const chunksRef = useRef([]);


//     //------------------------------------------------
//     useEffect(() => {
//         socketRef.current = io("https://hackathon-node-js.onrender.com"); // וודא שהפורט תואם לשרת
//         return () => socketRef.current.disconnect();
//     }, []);
//     //------------------------------------------------


//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             streamRef.current = stream;
//             const mediaRecorder = new MediaRecorder(stream,  { mimeType: 'audio/webm;codecs=opus' }  
//   );
//             mediaRecorderRef.current = mediaRecorder;

//             //---------------------------------------------
//             socketRef.current.emit('start-simulation', { traineeName: "שם הנציג" });
//             //---------------------------------------------

//             chunksRef.current = [];

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {

//                     //-----------------------------------------------
//                     socketRef.current.emit("audio-stream", event.data);
//                     //-----------------------------------------------

//                     chunksRef.current.push(event.data);
//                     console.log("Chunk collected:", event.data.size);
//                     if (socketRef.current) {
//                         socketRef.current.emit("audio-stream", event.data);
//                     }
//                 }
//             };

//             mediaRecorder.start(100);
//             setIsRecording(true);
//             console.log("Recording started...");
//         } catch (err) {
//             console.error("Error accessing microphone:", err);
//             alert("חובה לאשר גישה למיקרופון");
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//             streamRef.current.getTracks().forEach(track => track.stop());

//             setTimeout(() => {
//                 if (chunksRef.current.length > 0) {
//                     const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//                     const audioUrl = URL.createObjectURL(blob);
//                     const audio = new Audio(audioUrl);
//                     console.log("Playing back recording...");
//                     audio.play().catch(e => console.error("Playback failed:", e));
//                 }
//             }, 200);

//             setIsRecording(false);
//             console.log("Recording stopped.");

//                 //-----------------------------------------------
//                 socketRef.current.emit('stop-simulation');
//                 //-----------------------------------------------
//         }
//     };

//     // המוח מעביר לפנים את הפקודות!
//     return (
//         <VoiceInterface
//             isRecording={isRecording}
//             onStartClick={startRecording}
//             onStopClick={stopRecording}
//         />
//     );
// };

// // חובה לייצא כדי שה-App יוכל להשתמש בו
// export default AudioStreamer;


import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import VoiceInterface from './SimulationDashboard';

export const AudioStreamer = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState<'none' | 'agent' | 'ai'>('none');
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const socketRef = useRef(null);
    const chunksRef = useRef([]);

    // useEffect(() => {
    //     // התחברות לשרת
    //     socketRef.current = io("https://hackathon-node-js.onrender.com");

    //     // האזנה לעדכון מהשרת על חילופי דוברים (מבוסס Deepgram/Logic)
    //     socketRef.current.on('speaker-update', (speaker) => {
    //         console.log("הדובר התחלף ל:", speaker);
    //         setCurrentSpeaker(speaker);
    //     });

    //     return () => {
    //         if (socketRef.current) socketRef.current.disconnect();
    //     };
    // }, []);

    useEffect(() => {
    socketRef.current = io("https://hackathon-node-js.onrender.com", {
        transports: ["websocket", "polling"], // מאפשר גם פולינג אם ה-websocket נכשל
        withCredentials: true
    });

    socketRef.current.on("connect", () => {
        console.log("Connected to server! ID:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
    });

    return () => socketRef.current.disconnect();
}, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
            mediaRecorderRef.current = mediaRecorder;

            // עדכון התחלת סימולציה
            socketRef.current.emit('start-simulation', { traineeName: "שם הנציג" });
            setCurrentSpeaker('agent'); // הנציג מתחיל לדבר

            chunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socketRef.current) {
                    socketRef.current.emit("audio-stream", event.data);
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start(100);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("חובה לאשר גישה למיקרופון");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            streamRef.current.getTracks().forEach(track => track.stop());

            socketRef.current.emit('stop-simulation');

            setIsRecording(false);
            setCurrentSpeaker('none');
        }
    };

    return (
        <VoiceInterface
            isRecording={isRecording}
            currentSpeaker={currentSpeaker}
            onStartClick={startRecording}
            onStopClick={stopRecording}
        />
    );
};

export default AudioStreamer;