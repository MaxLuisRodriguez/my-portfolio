import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Algorithms for Mastodon",
      period: "Jun 2025 - Present",
      affiliation: "Stanford Social Media Lab",
      description: "As a Research Assistant for the Stanford Social Media Lab's Algorithms for Mastodon team, I helped implement end-to-end user media feeds using a machine learning engagement prediction model. I designed a novel Gini Coefficient plus KMeans loop to discover and rebalance social media categorical content used to train a deep binary classification neural network. In addition to data refactoring and designing the neural network, I developed techniques to prevent data deanonymization using integrity-preserving transforms of user avatars, images, and text.",
      technologies: ["Applied Machine Learning", "NLP", "Statistical Data Analysis", "Neural Networks", "Python"],
      previewImage: "/my-portfolio/pdfs/Algorithms_for_Mastodon_CURIS_Presentation___August_2025 (1).pdf",
      links: [
        { label: "View Presentation", url: "/my-portfolio/pdfs/Algorithms_for_Mastodon_CURIS_Presentation___August_2025 (1).pdf", type: "pdf" }
      ]
    },
    {
      title: "CS 231N: Galaxy Detection with Deep Learning",
      period: "Apr 2025 - Jun 2025",
      affiliation: "Stanford University",
      description: "Computer vision project applying convolutional neural networks to astronomical image analysis for galaxy detection and classification. Implemented state-of-the-art deep learning architectures to identify and classify galaxies from telescope imagery.",
      technologies: ["Computer Vision", "CNNs", "Deep Learning", "Python", "PyTorch"],
      previewImage: "/my-portfolio/pdfs/CS_231N_Final_Project_Poster.pdf",
      links: [
        { label: "Google Colab", url: "https://colab.research.google.com/drive/1tznApY1237MswM2FQ3wNe4E1aQMUxihs?usp=sharing", type: "external" },
        { label: "Final Report", url: "/my-portfolio/pdfs/CS_231N_Galaxy_Detection_Final_Report.pdf", type: "pdf" },
        { label: "Project Poster", url: "/my-portfolio/pdfs/CS_231N_Final_Project_Poster.pdf", type: "pdf" }
      ]
    },
    {
      title: "CS 131: Convolutional Approach to Pianist Technique Classification",
      period: "Jan 2025 - Mar 2025",
      affiliation: "Stanford University",
      description: "A continuation of my research on temporal AI classification of pianists' fine-motor control. Applied Lucas-Kanade optical flow to capture temporal relationships between keypoint features across sequences. Classified featurized pianist data using a two-branch CNN model to distinguish between beginner and advanced technique levels.",
      technologies: ["Computer Vision", "CNNs", "Optical Flow", "Research", "Data Preparation", "Python"],
      previewImage: "/my-portfolio/pdfs/CS 131 - Final Presentation (1).pdf",
      links: [
        { label: "GitHub Repository", url: "https://github.com/MaxLuisRodriguez/Updated-CS131-FinProj", type: "github" },
        { label: "Final Report", url: "/my-portfolio/pdfs/Piano_Technique___CS_131___Final_Project.pdf", type: "pdf" },
        { label: "Presentation", url: "/my-portfolio/pdfs/CS 131 - Final Presentation (1).pdf", type: "pdf" }
      ]
    },
    {
      title: "CS 229: Temporal AI Classification of Pianist Fine-Motor Skill",
      period: "Jan 2025 - Mar 2025",
      affiliation: "Stanford University",
      description: "Acquiring professional-level skill at classical piano requires consistent technical feedback. Traditionally, this feedback has come from experts in the field, but private instruction is often prohibitively expensive. Can this problem be solved by AI? Yes! I proposed developing an ML-driven classifier to assess fine-motor control proficiency, addressing the barrier of expensive and inaccessible private piano instruction.",
      technologies: ["Data Analysis", "Applied Machine Learning", "Probabilistic Models", "Python", "Data Preparation"],
      previewImage: "/my-portfolio/pdfs/CS229_Poster_Screenshot.pdf",
      links: [
        { label: "GitHub Repository", url: "https://github.com/MaxLuisRodriguez/CS229-Final-Project-Temporal-Pianist-Technique-Classification", type: "github" },
        { label: "Final Report", url: "/my-portfolio/pdfs/Updated_CS229_Final_Project_Report___Max_Rodriguez (3).pdf", type: "pdf" },
        { label: "Project Poster", url: "/my-portfolio/pdfs/CS229 Final Poster (4).pdf", type: "pdf" }
      ]
    },
    {
      title: "Somunicate: Functional Sound Recommender System",
      period: "Summer 2024",
      affiliation: "TU Berlin Audio Communication Research Group",
      description: "During my time interning with the Somunicate audio communication research group at TU Berlin, I designed the front and back-end of a functional sound recommender system. The project aims to automatically predict the functional and aesthetic communication goals perceived by users and formulate design recommendations that enable sound designers to communicate desired goals through audio.",
      technologies: ["Streamlit", "Python", "Audio Processing", "Machine Learning", "Full-Stack Development", "UX Design"],
      previewImage: "/my-portfolio/pdfs/Somunicate_Screenshot.pdf",
      links: [
        { label: "Try the App", url: "https://somunicate-dimension-based-audio-search-public.streamlit.app/", type: "external" },
        { label: "Research Info", url: "https://www.tu.berlin/en/ak/research/projects/somunicate", type: "external" }
      ]
    },
    {
      title: "Somunicate: Functional Sound Watermarking Tool",
      period: "Summer 2024",
      affiliation: "TU Berlin Audio Communication Research Group",
      description: "While interning for the audio communications research group at TU Berlin, I created a watermarking tool for functional sounds (UX effects). The tool enables researchers and sound designers to efficiently watermark and manage audio files for copyright protection and identification purposes.",
      technologies: ["Streamlit", "Python", "Audio Processing", "File Management", "UX Design"],
      previewImage: "/my-portfolio/pdfs/Somunicate_Watermark_Screenshot.pdf",
      links: [
        { label: "Try the App", url: "https://somunicate-watermark-tool-zwvn6urtj8wz3uakww577r.streamlit.app/", type: "external" }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4">Research & Projects</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            A collection of my research projects at Stanford University, focusing on artificial intelligence, 
            computer vision, and machine learning applications in music education and social media.
          </p>
          
          <div className="space-y-12 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Preview Section */}
                  <div className="bg-gray-100 overflow-hidden relative" style={{ height: '500px' }}>
                    <iframe
                      src={`${project.previewImage}#toolbar=0&navpanes=0&scrollbar=0&view=FitV&zoom=180`}
                      className="absolute w-full h-full border-none"
                      style={{ 
                        transform: 'scale(1.2) translateY(5%)', 
                        transformOrigin: 'center center',
                        top: '0',
                        left: '0'
                      }}
                      title={`${project.title} Preview`}
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{project.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                        <span>{project.affiliation}</span>
                        <span className="text-gray-400">•</span>
                        <span>{project.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                    <div className="flex flex-wrap gap-3">
                      {project.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : undefined}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            link.type === 'github' 
                              ? 'bg-gray-800 text-white hover:bg-gray-700'
                              : link.type === 'external'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
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
