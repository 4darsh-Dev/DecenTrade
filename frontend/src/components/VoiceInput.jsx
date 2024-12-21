

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import { Client } from '@gradio/client';

const VoiceInput = ({ onVoiceInputComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error } = recorderControls;

  useEffect(() => {
    if (!recordedBlob) return;

    const processAudioWithGradio = async () => {
      try {
        const client = await Client.connect("4darsh-Dev/wshiper_specch_txt");
        const result = await client.predict("/predict", {
          audio_file: new Blob([recordedBlob], { type: 'audio/wav' }),
        });
        console.log("processing your audio, Have patience ")

        const transcript = result?.data?.[0];
        if (transcript) {
          console.log('Transcription:', transcript);
          onVoiceInputComplete(transcript);
        }
      } catch (error) {
        console.error('Gradio API error:', error);
      }
    };

    processAudioWithGradio();
  }, [recordedBlob, onVoiceInputComplete]);

  useEffect(() => {
    if (error) {
      console.error('Visualizer error:', error);
    }
  }, [error]);

  const startVoiceInput = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      setIsListening(true);
    } catch (error) {
      console.error('Voice input initialization error:', error);
    }
  };

  const stopVoiceInput = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
      audioContext.close();
    }
    setIsListening(false);
    setAudioStream(null);
    setAudioContext(null);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isListening ? stopVoiceInput : startVoiceInput}
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

      {isListening && (
        <div className="flex-grow">
          <VoiceVisualizer
            controls={recorderControls}
            width={200}
            height={50}
            className="bg-gray-700 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default VoiceInput;


