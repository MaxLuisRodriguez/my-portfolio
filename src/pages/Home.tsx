import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Banner Image */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        {/* Banner Image */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="/my-portfolio/images/stanford-photo.jpg" 
            alt="Stanford University"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative container mx-auto px-6 text-center">
          <div className="mb-8">
            <img 
              src="/my-portfolio/images/headshot.jpg" 
              alt="Max Rodriguez"
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Max Rodriguez
          </h1>
          <p className="text-xl text-indigo-600 font-semibold mb-6">
            Stanford University '26
          </p>
          <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
            As a classical pianist and computer scientist, I am dedicated to using AI to make 
            professional musicianship more accessible to those from underserved backgrounds 
            and communities with limited musical opportunity.
          </p>
          <p className="text-md text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore samples of my professional work experience, projects, and portfolio.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Applied Machine Learning',
              'Computer Vision',
              'Deep Learning / CNNs',
              'Natural Language Processing',
              'Statistical Data Analysis',
              'Python',
              'PyTorch / TensorFlow',
              'Data Preparation',
              'Neural Networks',
              'Optical Flow',
              'Probabilistic Models',
              'Research & Analysis'
            ].map((skill) => (
              <div key={skill} className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-sm md:text-base font-semibold text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Research</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-3">
                <span className="text-sm font-semibold text-gray-600">Stanford Social Media Lab • Jun 2025 - Present</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Algorithms for Mastodon</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                As a Research Assistant, I'm helping implement end-to-end user media feeds using machine learning 
                engagement prediction models. I designed a novel Gini Coefficient plus KMeans loop to discover and 
                rebalance social media categorical content for training a deep binary classification neural network.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Machine Learning
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  NLP
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Neural Networks
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Data Privacy
                </span>
              </div>
              <div className="mt-6">
                <Link
                  to="/projects"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;