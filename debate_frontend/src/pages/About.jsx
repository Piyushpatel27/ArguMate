import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 text-center rounded-b-3xl shadow-md mb-12">
        <h1 
          className={`text-4xl font-bold mb-4 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} transition-all duration-800`}
        >
          AI-Powered Debate Platform
        </h1>
        <p 
          className={`text-xl opacity-90 max-w-3xl mx-auto transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} transition-all duration-800 delay-200`}
        >
          Enhance your speaking skills, eliminate hesitation, and master voice modulation with cutting-edge AI technology.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-sm">
            Tech Stack Used:
          </div>
          {techStack.map((tech, index) => (
            <div 
              key={index}
              className="px-4 py-2 bg-white rounded-full shadow-sm hover:transform hover:scale-110 transition-transform duration-300"
            >
              {tech}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 mb-16">
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Improving Your Skills
          </a>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, index, isLoaded }) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer transform ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
      style={{ transitionDelay: `${300 * (index + 1)}ms` }}
      onClick={() => setIsActive(!isActive)}
    >
      <h3 className="text-xl font-semibold text-blue-600 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

// Data
const features = [
  {
    title: "Voice-Enabled Learning",
    description: "Practice debates and speeches using voice commands, receiving real-time feedback on your delivery and content."
  },
  {
    title: "AI-Powered Analysis",
    description: "Get instant feedback on your speech patterns, pronunciation, and argument structure using advanced AI algorithms."
  },
  {
    title: "Multilingual Support",
    description: "Break language barriers with integrated Google Translate, enabling practice in multiple languages."
  }
];

const techStack = [
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "Gemini API",
  "Google Translate"
];

export default AboutPage;