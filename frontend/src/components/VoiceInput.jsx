// import React, { useState, useRef, useEffect } from 'react';
// import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
// import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
// import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

// const VoiceInput = ({ onVoiceInputComplete }) => {
//   // State management for voice input
//   const [isListening, setIsListening] = useState(false);
//   const [audioContext, setAudioContext] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioStream, setAudioStream] = useState(null);

//   // Refs for audio processing
//   const recorderControlsRef = useRef(null);
//   const visualizerRef = useRef(null);

//   // Advanced voice recognition setup
//   const setupSpeechRecognition = async () => {
//     try {
//       // Use modern Web Speech API with Speechly polyfill for enhanced cross-browser support
//       const SpeechlySpeechRecognition = createSpeechlySpeechRecognition();
//       const recognition = new SpeechlySpeechRecognition();

//       // Configure recognition settings
//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = 'en-US';

//       // Speech recognition event handlers
//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.trim();
//         if (transcript) {
//           // Callback with transcribed text
//           onVoiceInputComplete(transcript);
//         }
//       };

//       recognition.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
//       };

//       return recognition;
//     } catch (error) {
//       console.error('Speech recognition setup failed:', error);
//       return null;
//     }
//   };

//   // Advanced audio visualization and processing
//   const startVoiceInput = async () => {
//     try {
//       // Request microphone access
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setAudioStream(stream);

//       // Setup audio context for advanced processing
//       const context = new (window.AudioContext || window.webkitAudioContext)();
//       setAudioContext(context);

//       // Create media recorder for additional audio capabilities
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);

//       // Start listening and processing
//       setIsListening(true);

//       // Optional: Start speech recognition
//       const recognition = await setupSpeechRecognition();
//       if (recognition) {
//         recognition.start();
//       }

//       // Advanced audio visualization
//       const audioSource = context.createMediaStreamSource(stream);
//       const analyser = context.createAnalyser();
//       audioSource.connect(analyser);

//     } catch (error) {
//       console.error('Voice input initialization error:', error);
//       setIsListening(false);
//     }
//   };

//   // Stop voice input and cleanup
//   const stopVoiceInput = () => {
//     try {
//       // Stop audio stream tracks
//       if (audioStream) {
//         audioStream.getTracks().forEach(track => track.stop());
//       }

//       // Close audio context
//       if (audioContext) {
//         audioContext.close();
//       }

//       // Reset states
//       setIsListening(false);
//       setAudioStream(null);
//       setAudioContext(null);
//     } catch (error) {
//       console.error('Voice input stop error:', error);
//     }
//   };

//   // Render voice input interface
//   return (
//     <div className="flex items-center space-x-2">
//       {/* Voice Input Toggle Button */}
//       <button 
//         onClick={isListening ? stopVoiceInput : startVoiceInput}
//         className={`
//           p-2 rounded-full transition-all duration-300
//           ${isListening 
//             ? 'bg-red-500 text-white animate-pulse' 
//             : 'bg-blue-500 text-white hover:bg-blue-600'
//           }
//         `}
//       >
//         {isListening ? <MicOff size={20} /> : <Mic size={20} />}
//       </button>

//       {/* Audio Visualizer */}
//       {isListening && (
//         <div className="flex-grow">
//           <VoiceVisualizer 
//             ref={visualizerRef}
//             width={200}
//             height={50}
//             className="bg-gray-700 rounded"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceInput;


import React, { useState, useRef, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

const VoiceInput = ({ onVoiceInputComplete }) => {
  const [isListening, setIsListening] = useState(false);
  
  // Refs and state for voice recording
  const recorderControlsRef = useRef(null);
  const {
    startRecording, 
    stopRecording, 
    recordingBlob, 
    isRecording,
    clearRecording
  } = useVoiceVisualizer();

  // Effect to handle recorded blob
  React.useEffect(() => {
    const processRecording = async () => {
      if (recordingBlob) {
        try {
          // Convert blob to text using Web Speech API
          const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.lang = 'en-US';
          
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
              onVoiceInputComplete(transcript);
            }
          };

          // Create a file reader to convert blob to audio file
          const reader = new FileReader();
          reader.onloadend = () => {
            // You could potentially send the audio file to a transcription service here
            console.log('Audio recorded:', reader.result);
          };
          reader.readAsDataURL(recordingBlob);

          // Clear the recording after processing
          clearRecording();
        } catch (error) {
          console.error('Transcription error:', error);
        }
      }
    };

    processRecording();
  }, [recordingBlob, onVoiceInputComplete, clearRecording]);

  // Handler for starting/stopping recording
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      setIsListening(false);
    } else {
      startRecording();
      setIsListening(true);
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="flex items-center space-x-4">
      {/* Recording Button */}
      <button 
        onClick={toggleRecording}
        className={`
          p-2 rounded-full transition-all duration-300
          ${isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
        `}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Voice Visualizer */}
      {isListening && (
        <VoiceVisualizer 
          ref={recorderControlsRef}
          width={200}
          height={50}
          className="bg-gray-700 rounded"
        />
      )}
    </div>
  );
};

export default VoiceInput;