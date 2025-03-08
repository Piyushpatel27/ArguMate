import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Message = ({ text, isSent, onSpeakMessage, isSpeakingThisMessage }) => (
  <div className={`mb-3 px-3 py-2 rounded-lg max-w-[60%] text-sm ${
    isSent ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-100 mr-auto'
  }`}>
    <p>{text}</p>
    {!isSent && (
      <button 
        onClick={() => onSpeakMessage(text)}
        className={`mt-2 text-xs flex items-center ${
          isSpeakingThisMessage 
            ? "text-blue-600 font-medium" 
            : "text-gray-500 hover:text-gray-700"
        }`}
        title={isSpeakingThisMessage ? "Stop speaking" : "Listen to this response"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
        {isSpeakingThisMessage ? "Stop" : "Listen"}
      </button>
    )}
  </div>
);

const DebateRoom = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([{ text: 'Start Debating', isSent: false }]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("Enter Your Topic Of Debate");
  const [userStance, setUserStance] = useState("against");
  const [language, setLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeakingIndex, setCurrentlySpeakingIndex] = useState(null);
  
  const recognitionRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
    }
    
    return () => {
      // Clean up speech recognition when component unmounts
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Clean up speech synthesis when component unmounts
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Get available voices for the selected language
  const getVoiceForLanguage = (languageCode) => {
    const voices = speechSynthesis.getVoices();
    
    // First try to find a voice that matches exactly
    let voice = voices.find(voice => 
      voice.lang.toLowerCase() === (languageCode === "hi" ? "hi-IN" : "en-US").toLowerCase()
    );
    
    // If no exact match, try to find a voice that starts with the language code
    if (!voice) {
      voice = voices.find(voice => 
        voice.lang.toLowerCase().startsWith(languageCode.toLowerCase())
      );
    }
    
    // Default to the first available voice if no match found
    return voice || voices[0];
  };

  // Speech Synthesis - Text to Speech
  const speakMessage = (text, index) => {
    if ('speechSynthesis' in window) {
      // If already speaking this message, stop it
      if (currentlySpeakingIndex === index) {
        stopSpeaking();
        return;
      }
      
      // Otherwise cancel any ongoing speech and start new one
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Wait for voices to be loaded
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          setupUtterance(utterance, text, index);
        };
      } else {
        setupUtterance(utterance, text, index);
      }
    } else {
      alert("Text-to-speech is not supported in your browser. Try Chrome or Edge.");
    }
  };

  // Setup utterance with proper settings
  const setupUtterance = (utterance, text, index) => {
    // Set language based on selection
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    
    // Try to find an appropriate voice
    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Adjust settings for better Hindi speech
    if (language === "hi") {
      utterance.rate = 0.9; // Slightly slower for Hindi
      utterance.pitch = 1.0;
    } else {
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }
    
    // Split long Hindi text into chunks if needed
    if (language === "hi" && text.length > 150) {
      speakTextInChunks(text, index);
      return;
    }
    
    // Events to track speaking state
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentlySpeakingIndex(index);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingIndex(null);
    };
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      setCurrentlySpeakingIndex(null);
    };
    
    speechSynthesis.speak(utterance);
  };

  // Speak long Hindi text in chunks to prevent cutting off
  const speakTextInChunks = (text, index) => {
    // Split text by sentences or periods
    const chunks = text.match(/[^।?!,.]+[।?!,.]+/g) || [text];
    
    let currentChunk = 0;
    
    const speakNextChunk = () => {
      if (currentChunk < chunks.length) {
        const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
        utteranceRef.current = utterance;
        
        utterance.lang = "hi-IN";
        const voice = getVoiceForLanguage("hi");
        if (voice) {
          utterance.voice = voice;
        }
        
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        
        if (currentChunk === 0) {
          setIsSpeaking(true);
          setCurrentlySpeakingIndex(index);
        }
        
        utterance.onend = () => {
          currentChunk++;
          speakNextChunk();
        };
        
        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
          setIsSpeaking(false);
          setCurrentlySpeakingIndex(null);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
        setCurrentlySpeakingIndex(null);
      }
    };
    
    speakNextChunk();
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingIndex(null);
    }
  };

  // Start Speech Recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser. Try Chrome.");
      return;
    }

    // Stop any ongoing speech first
    stopSpeaking();

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === "hi" ? "hi-IN" : "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        }
      }
      setInputText(prev => prev + transcript);
    };

    recognition.start();
  };

  // Stop Speech Recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      // Stop any ongoing speech or listening
      stopSpeaking();
      stopListening();
      
      setMessages(prev => [...prev, { text: inputText, isSent: true }]);
      setIsLoading(true);
      const userArgument = inputText;
      setInputText('');

      try {
        const response = await axios.post('http://localhost:3000/api/debate', {
          topic: currentTopic,
          userStance: userStance,
          userArgument: userArgument,
          language: language
        });

        const aiResponse = response.data.aiResponse;
        setMessages(prev => [...prev, { text: aiResponse, isSent: false }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: "Sorry, I couldn't generate a response. Please try again.", isSent: false }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    // Stop any ongoing speech when language changes
    stopSpeaking();
    setLanguage(newLanguage);
    
    // Force a refresh of available voices when language changes
    if (speechSynthesis) {
      speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded for", newLanguage);
      };
      speechSynthesis.getVoices();
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-sm flex flex-col h-[85vh]">
        
        {/* Debate Settings */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Debate Settings</h2>
          <input
            type="text"
            placeholder="Enter Debate Topic..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-600 mt-3"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
          />
          <div className="mt-3 flex gap-4">
            <label className="font-medium">Your Stance:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-600" 
              value={userStance}
              onChange={(e) => setUserStance(e.target.value)}
            >
              <option value="for">For</option>
              <option value="against">Against</option>
            </select>
          </div>
          <div className="mt-3 flex gap-4">
            <label className="font-medium">Language:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-600" 
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
        
        {/* Global Speech Controls */}
        {isSpeaking && (
          <div className="bg-blue-50 p-2 flex justify-center items-center">
            <div className="flex items-center">
              <div className="relative h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
              <span className="text-sm text-blue-700">Speaking...</span>
            </div>
            <button 
              onClick={stopSpeaking}
              className="ml-3 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Stop
            </button>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message, index) => (
            <Message 
              key={index} 
              text={message.text} 
              isSent={message.isSent} 
              onSpeakMessage={(text) => speakMessage(text, index)}
              isSpeakingThisMessage={currentlySpeakingIndex === index}
            />
          ))}
          {isLoading && (
            <div className="flex justify-center my-4">
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input and Voice Controls */}
        <div className="flex gap-4 p-4 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your argument here..."
            className="flex-grow px-3 py-3 border border-gray-200 rounded-md outline-none focus:border-blue-600"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          {/* Start/Stop Voice Button */}
          <button 
            onClick={toggleListening}
            className={`px-4 py-3 rounded-md text-white transition-all duration-300 ease-in-out ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
            }`}
            title={isListening ? "Stop recording" : "Start voice input"}
            disabled={isLoading}
          >
            {isListening ? '🛑 Stop' : '🎙️ Speak'}
          </button>

          {/* Send Button */}
          <button 
            className={`px-6 py-3 text-white border-none rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
              isLoading || !inputText.trim() 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:translate-y-[-2px]'
            }`}
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebateRoom;