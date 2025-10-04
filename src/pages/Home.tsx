import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Hello, I'm Your Name
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm a passionate developer who loves creating amazing web experiences.
            Welcome to my portfolio!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'React', 'TypeScript', 'Node.js', 'Python',
              'HTML/CSS', 'JavaScript', 'Git', 'MongoDB'
            ].map((skill) => (
              <div key={skill} className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Project</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Project Name</h3>
              <p className="text-gray-600 mb-6">
                A brief description of your featured project. Explain what it does,
                what technologies you used, and what you learned from building it.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  Node.js
                </span>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold mr-4"
                >
                  Live Demo
                </a>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;