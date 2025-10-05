import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
          
          {/* Resume Download Button */}
          <div className="text-center mb-12">
            <a
              href="/my-portfolio/pdfs/September 2025 Resume.pdf"
              download
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">My Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Growing up in Langley, a small "Village by the Sea" on Whidbey Island, I faced 
                limited opportunities in both art and engineering. However, discovering my passion 
                for piano and math at an early age led me to immerse myself in the works of Chopin, 
                Beethoven, and Rachmaninoff, as well as advanced mathematics, engineering, and 
                computer science.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To date, I have placed first at the 2022 Washington State Math Olympiad Competition 
                and was a prize winner at the Charleston International Piano Competition.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/my-portfolio/images/stanford-photo.jpg" 
                alt="Max Rodriguez at Stanford University"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold">Stanford University</h3>
                <p className="text-gray-600 mb-2">Class of 2026</p>
                <p className="text-gray-700 font-medium mb-2">
                  B.S. in Symbolic Systems (Concentration in Artificial Intelligence)
                </p>
                <p className="text-gray-700 font-medium mb-3">
                  Minor: Music and German Studies
                </p>
                <p className="text-gray-500">
                  Studying the intersection of artificial intelligence, cognitive science, 
                  linguistics, and philosophy, with a focus on developing AI-driven solutions 
                  for creative and educational applications.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Current Work</h2>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-indigo-900">AI Music Education Startup</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                I am currently developing a computer vision (CV) startup aimed at providing an 
                AI-driven technique feedback tool for a global community of underprivileged musicians. 
                As a self-taught pianist before coming to Stanford, I understand the point at which 
                professional instruction becomes essential for reaching the advanced technical levels 
                required to pursue a career in classical piano.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The primary mission of my startup is to make professional musicianship more accessible 
                by developing an AI teacher capable of helping students overcome the demanding technique 
                plateau that often prevents aspiring musicians from reaching their full potential.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">AI & Computer Vision</h3>
                <p className="text-gray-600 mb-4">
                  Developing machine learning models and computer vision systems for real-world applications in music education.
                </p>
                <a
                  href="https://colab.research.google.com/drive/1tznApY1237MswM2FQ3wNe4E1aQMUxihs?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  View Galaxy Detection Project
                </a>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Classical Piano</h3>
                <p className="text-gray-600 mb-4">
                  Award-winning pianist with expertise in Romantic repertoire and performance technique.
                </p>
                <a
                  href="https://github.com/MaxLuisRodriguez/CS229-Final-Project-Temporal-Pianist-Technique-Classification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold text-sm"
                >
                  View Piano AI Research
                </a>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Full-Stack Development</h3>
                <p className="text-gray-600 mb-4">
                  Building end-to-end solutions with modern frameworks and technologies for web and mobile platforms.
                </p>
                <Link
                  to="/projects"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
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

export default About;