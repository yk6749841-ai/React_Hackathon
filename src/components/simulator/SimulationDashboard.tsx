// import React, { useState, useEffect } from 'react';
// import { Box, Container, AppBar, Toolbar, Typography, Fab, Stack, keyframes } from '@mui/material';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';

// // הצבעים והאנימציות
// const BRAND_COLORS = { red: '#E3000F', darkBlue: '#121D3A', lightGray: '#F7F9FC', white: '#FFFFFF' };

// const pulseAnimation = keyframes`
//   0% { box-shadow: 0 0 0 0 rgba(227, 0, 15, 0.5); }
//   70% { box-shadow: 0 0 0 25px rgba(227, 0, 15, 0); }
//   100% { box-shadow: 0 0 0 0 rgba(227, 0, 15, 0); }
// `;

// const waveAnimation = keyframes`
//   0%, 100% { transform: scaleY(0.2); }
//   50% { transform: scaleY(1); }
// `;

// // הגדרת הנתונים שהעיצוב "דורש" לקבל מהמוח
// interface VoiceInterfaceProps {
//     isRecording: boolean;
//     onStartClick: () => void;
//     onStopClick: () => void;
// }

// // הקומפוננטה מקבלת את הפונקציות מבחוץ!
// export default function VoiceInterface({ isRecording, onStartClick, onStopClick }: VoiceInterfaceProps) {
//     const [currentSpeaker, setCurrentSpeaker] = useState('none'); 

//     useEffect(() => {
//         let interval: ReturnType<typeof setInterval>;
//         if (isRecording) {
//             setCurrentSpeaker('agent');
//             interval = setInterval(() => {
//                 setCurrentSpeaker((prev) => prev === 'agent' ? 'ai' : 'agent');
//             }, 4000);
//         } else {
//             setCurrentSpeaker('none');
//         }
//         return () => clearInterval(interval);
//     }, [isRecording]);

//     const renderWaveformBars = () => {
//         const bars = [];
//         const numOfBars = 25;
//         let barColor = BRAND_COLORS.lightGray;
//         if (currentSpeaker === 'agent') barColor = BRAND_COLORS.red;
//         if (currentSpeaker === 'ai') barColor = BRAND_COLORS.darkBlue;

//         for (let i = 0; i < numOfBars; i++) {
//             const randomDuration = 0.5 + Math.random() * 0.7;
//             const randomDelay = Math.random() * 0.5;
//             bars.push(
//                 <Box key={i} sx={{
//                     width: { xs: 4, md: 8 }, height: 100, backgroundColor: barColor, borderRadius: 10,
//                     transition: 'background-color 0.5s ease', transformOrigin: 'center',
//                     animation: isRecording ? `${waveAnimation} ${randomDuration}s ease-in-out ${randomDelay}s infinite` : 'none',
//                     transform: isRecording ? 'scaleY(0.2)' : 'scaleY(0.1)',
//                 }} />
//             );
//         }
//         return bars;
//     };

//     const getStatusText = () => {
//         if (!isRecording) return "המערכת במצב המתנה. לחץ על המיקרופון להתחלה.";
//         if (currentSpeaker === 'agent') return "אתה מדבר, המערכת מאזינה...";
//         if (currentSpeaker === 'ai') return "ה-AI של ביטוח ישיר מעבד ומשיב...";
//         return "מתחבר...";
//     };

//     return (
//         <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: BRAND_COLORS.lightGray, direction: 'rtl' }}>
//             <AppBar position="static" elevation={1} sx={{ backgroundColor: BRAND_COLORS.white }}>
//                 <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
//                     <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
//                         <Box component="img" src="/path-to-your-logo.png" alt="לוגו ביטוח ישיר" sx={{ height: 40, width: 120, backgroundColor: '#eee', borderRadius: 1 }} />
//                         <Typography variant="h6" sx={{ color: BRAND_COLORS.darkBlue, fontWeight: 'bold' }}>Vocal AI Assistant</Typography>
//                     </Stack>
//                 </Toolbar>
//             </AppBar>

//             <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
//                 <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} sx={{ height: 150, width: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
//                     {renderWaveformBars()}
//                 </Stack>
//                 <Typography variant="h6" sx={{ color: currentSpeaker === 'ai' ? BRAND_COLORS.darkBlue : BRAND_COLORS.red, fontWeight: 500, transition: 'color 0.4s ease', opacity: isRecording ? 1 : 0.6 }}>
//                     {getStatusText()}
//                 </Typography>
//             </Container>

//             <Box sx={{ pb: 8, display: 'flex', justifyContent: 'center' }}>
//                 <Fab color="primary" aria-label="record" 
//                      /* כאן אנחנו קוראים לפונקציות שהגיעו מבחוץ! */
//                      onClick={isRecording ? onStopClick : onStartClick}
//                      sx={{
//                         backgroundColor: isRecording ? BRAND_COLORS.white : BRAND_COLORS.red, color: isRecording ? BRAND_COLORS.red : BRAND_COLORS.white,
//                         width: 80, height: 80, animation: isRecording ? `${pulseAnimation} 2s infinite` : 'none',
//                         '&:hover': { backgroundColor: isRecording ? '#f0f0f0' : '#c2000c' }, boxShadow: 4
//                      }}>
//                     {isRecording ? <MicIcon sx={{ fontSize: 40 }} /> : <MicOffIcon sx={{ fontSize: 40 }} />}
//                 </Fab>
//             </Box>
//         </Box>
//     );
// }


import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Fab, Stack, keyframes } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const BRAND_COLORS = { red: '#E3000F', darkBlue: '#121D3A', lightGray: '#F7F9FC', white: '#FFFFFF' };

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(227, 0, 15, 0.5); }
  70% { box-shadow: 0 0 0 25px rgba(227, 0, 15, 0); }
  100% { box-shadow: 0 0 0 0 rgba(227, 0, 15, 0); }
`;

const waveAnimation = keyframes`
  0%, 100% { transform: scaleY(0.2); }
  50% { transform: scaleY(1); }
`;

interface VoiceInterfaceProps {
    isRecording: boolean;
    currentSpeaker: 'agent' | 'ai' | 'none';
    onStartClick: () => void;
    onStopClick: () => void;
}

export default function VoiceInterface({ isRecording, currentSpeaker, onStartClick, onStopClick }: VoiceInterfaceProps) {
    
    const renderWaveformBars = () => {
        const bars = [];
        const numOfBars = 25;
        
        // בחירת צבע לפי הדובר הנוכחי שמתקבל מהפרופס
        let barColor = '#e0e0e0'; // צבע ברירת מחדל (אפור בהיר)
        if (currentSpeaker === 'agent') barColor = BRAND_COLORS.red;
        if (currentSpeaker === 'ai') barColor = BRAND_COLORS.darkBlue;

        for (let i = 0; i < numOfBars; i++) {
            const randomDuration = 0.5 + Math.random() * 0.7;
            const randomDelay = Math.random() * 0.5;
            bars.push(
                <Box key={i} sx={{
                    width: { xs: 4, md: 8 }, 
                    height: 100, 
                    backgroundColor: barColor, 
                    borderRadius: 10,
                    transition: 'background-color 0.4s ease', 
                    transformOrigin: 'center',
                    animation: isRecording ? `${waveAnimation} ${randomDuration}s ease-in-out ${randomDelay}s infinite` : 'none',
                    transform: isRecording ? 'scaleY(0.2)' : 'scaleY(0.1)',
                }} />
            );
        }
        return bars;
    };

    const getStatusText = () => {
        if (!isRecording) return "המערכת במצב המתנה. לחץ על המיקרופון להתחלה.";
        if (currentSpeaker === 'agent') return "הנציג מדבר (המערכת מאזינה)...";
        if (currentSpeaker === 'ai') return "הלקוח (AI) מגיב כעת...";
        return "מתחבר...";
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: BRAND_COLORS.lightGray, direction: 'rtl' }}>
            <AppBar position="static" elevation={1} sx={{ backgroundColor: BRAND_COLORS.white }}>
                <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <Box component="img" src="/path-to-your-logo.png" alt="לוגו" sx={{ height: 40, width: 120, backgroundColor: '#eee', borderRadius: 1 }} />
                        <Typography variant="h6" sx={{ color: BRAND_COLORS.darkBlue, fontWeight: 'bold' }}>סימולציית שירות - ביטוח ישיר</Typography>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} sx={{ height: 150, width: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
                    {renderWaveformBars()}
                </Stack>
                
                <Typography variant="h6" sx={{ 
                    color: currentSpeaker === 'ai' ? BRAND_COLORS.darkBlue : BRAND_COLORS.red, 
                    fontWeight: 600, 
                    transition: 'color 0.4s ease', 
                    opacity: isRecording ? 1 : 0.6 
                }}>
                    {getStatusText()}
                </Typography>
            </Container>

            <Box sx={{ pb: 8, display: 'flex', justifyContent: 'center' }}>
                <Fab 
                    aria-label="record" 
                    onClick={isRecording ? onStopClick : onStartClick}
                    sx={{
                        backgroundColor: isRecording ? BRAND_COLORS.white : BRAND_COLORS.red, 
                        color: isRecording ? BRAND_COLORS.red : BRAND_COLORS.white,
                        width: 80, height: 80, 
                        animation: isRecording ? `${pulseAnimation} 2s infinite` : 'none',
                        '&:hover': { backgroundColor: isRecording ? '#f0f0f0' : '#c2000c' }, 
                        boxShadow: 4
                    }}>
                    {isRecording ? <MicIcon sx={{ fontSize: 40 }} /> : <MicOffIcon sx={{ fontSize: 40 }} />}
                </Fab>
            </Box>
        </Box>
    );
}