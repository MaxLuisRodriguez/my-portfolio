import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product management, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that displays current conditions and forecasts for multiple cities with interactive maps.",
      technologies: ["React", "JavaScript", "OpenWeather API", "Chart.js"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Blog Platform",
      description: "A content management system for blogging with markdown support, comment system, and admin dashboard.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills with modern design and smooth animations.",
      technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "API Integration Tool",
      description: "A tool for testing and documenting REST APIs with automated testing capabilities and interactive documentation.",
      technologies: ["Node.js", "Express", "Jest", "Swagger"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
