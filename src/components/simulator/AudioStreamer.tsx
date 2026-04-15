import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import VoiceInterface from './SimulationDashboard';

export const AudioStreamer = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState('none');
    // const [currentSpeaker, setCurrentSpeaker] = useState<'none' | 'agent' | 'ai'>('none');

    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const socketRef = useRef(null);
    const chunksRef = useRef([]);

    useEffect(() => {
        // התחברות לשרת (מקומי או מרוחק)
        socketRef.current = io("http://localhost:10000");

        socketRef.current.on("connect", () => {
            console.log("Connected to server! ID:", socketRef.current.id);
        });

        socketRef.current.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });

        // האזנה לעדכון מהשרת על חילופי דוברים
        socketRef.current.on('speaker-update', (speaker) => {
            console.log("הדובר התחלף ל:", speaker);
            setCurrentSpeaker(speaker);
        });

        // ניקוי בפירוק הקומפוננטה
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });
            mediaRecorderRef.current = mediaRecorder;

            // עדכון התחלת סימולציה
            socketRef.current.emit('start-simulation', { traineeName: "שם הנציג" });
            setCurrentSpeaker('agent');

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

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            socketRef.current.emit('stop-simulation');

            setIsRecording(false);
            setCurrentSpeaker('none');
        }
    };

    return (
        <VoiceInterface
            isRecording={isRecording}
            currentSpeaker={currentSpeaker as 'none' | 'agent' | 'ai'} // כאן התיקון
            onStartClick={startRecording}
            onStopClick={stopRecording}
        />
    );
};

export default AudioStreamer;