import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">My Story</h2>
              <p className="text-gray-600 mb-4">
                I'm a passionate developer with a love for creating innovative solutions.
                My journey in programming began with curiosity and has evolved into a
                career focused on building meaningful digital experiences.
              </p>
              <p className="text-gray-600 mb-4">
                I enjoy working on projects that challenge me and allow me to learn
                new technologies. When I'm not coding, you can find me exploring new
                technologies, reading about software architecture, or contributing to
                open-source projects.
              </p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Your Photo Here</span>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Education & Experience</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold">Software Developer</h3>
                <p className="text-gray-600">Company Name • 2022 - Present</p>
                <p className="text-gray-500 mt-2">
                  Developed and maintained web applications using React, Node.js, and modern JavaScript frameworks.
                </p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-6">
                <h3 className="text-xl font-semibold">Computer Science Degree</h3>
                <p className="text-gray-600">University Name • 2018 - 2022</p>
                <p className="text-gray-500 mt-2">
                  Studied computer science with focus on software engineering and web development.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                <p className="text-gray-600">
                  Building responsive and interactive web applications using modern frameworks.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
                <p className="text-gray-600">
                  Creating cross-platform mobile applications with React Native.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                <p className="text-gray-600">
                  Designing and implementing robust server-side solutions and APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;