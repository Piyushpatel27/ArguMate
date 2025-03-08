import React from "react";
import { FaGraduationCap, FaComments, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 text-center bg-gradient-to-br from-blue-600/5 to-blue-600/10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Master the Art of Debate
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          Join ArguMate to enhance your critical thinking, improve your argumentation skills, and engage in meaningful discussions with peers worldwide.
        </p>
        <button onClick={()=> navigate("/home")} className="text-xl md:text-2xl px-8 md:px-12 py-4 md:py-6 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
          Get Started 
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose ArguMate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300">
              <FaGraduationCap className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Structured Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Follow our proven methodology to develop strong argumentation skills through structured debate formats and expert guidance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300">
              <FaComments className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Real-time Practice
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Engage in live debates with peers, receive instant feedback, and track your progress with detailed analytics.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300">
              <FaGlobe className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Global Community
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with debaters worldwide, participate in tournaments, and learn from diverse perspectives and experiences.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of users who have already improved their debating skills with ArguMate.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1">
          Start Free Trial
        </button>
      </section>
    </div>
  );
};

export default LandingPage;