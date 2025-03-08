import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { useUser} from "@clerk/clerk-react";
const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUser();
  return (
   
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content - using container with max-width and margin auto */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 mt-16">
        {/* Welcome Cards - using grid with contained width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Welcome back, {user.firstName||user.username}</h2>
            <p className="text-gray-700 mb-4">Ready to engage in thought-provoking debates today?</p>
            <Link 
              to="/debate"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-md"
            >
              Start Debating
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Daily Inspiration</h3>
            <p className="text-gray-600 italic">
              "The art of debate lies not in winning arguments, but in fostering understanding through respectful discourse."
            </p>
          </div>
        </div>

        {/* Popular Activities - with proper heading and view all */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Popular Activities</h2>
            <Link to="/activities" className="text-blue-600">View all</Link>
          </div>
          
          {/* Activity cards in a grid with 3 equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2 text-center">Last Debate Topic</h3>
              <p className="text-gray-700 mb-4 text-center">"Should Artificial Intelligence Development Be Regulated?"</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>⏱ Prep: 25s</span>
                <span>1 question</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2 text-center">Popular Topic</h3>
              <p className="text-gray-700 mb-4 text-center">"Is Social Media Harmful to Society?"</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>⏱ Prep: 30s</span>
                <span>3 questions</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2 text-center">Trending Debate</h3>
              <p className="text-gray-700 mb-4 text-center">"Should Universal Basic Income Be Implemented?"</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>⏱ Prep: 45s</span>
                <span>2 questions</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-12 py-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
          
          {/* Steps in a 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full text-white flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium mb-2 hover:text-blue-600 transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

// Data
const steps = [
  {
    number: 1,
    title: "Choose Topic",
    description: "Select from curated debate topics"
  },
  {
    number: 2,
    title: "Prepare",
    description: "Get ready with key points"
  },
  {
    number: 3,
    title: "Debate",
    description: "Engage in structured discussion"
  },
  {
    number: 4,
    title: "Review",
    description: "Get feedback and improve"
  }
];

export default HomePage;