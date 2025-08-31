import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SwiperCube from '../components/SwiperCube';

const About: React.FC = () => {
  // Import product images dynamically
  const imageModules = import.meta.glob('../assets/images/products/*', { eager: true });
  const productImages = Object.values(imageModules).map((module: any) => module.default);

  const values = [
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and reducing our environmental footprint.'
    },
    {
      icon: '🔬',
      title: 'Innovation',
      description: 'Continuously researching and developing cutting-edge energy solutions.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building strong relationships with our customers and partners worldwide.'
    },
    {
      icon: '⭐',
      title: 'Excellence',
      description: 'Maintaining the highest standards in quality and customer satisfaction.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'WAW Energy was established with a vision to revolutionize the energy drink industry.'
    },
    {
      year: '2021',
      title: 'First Product Launch',
      description: 'Successfully launched our flagship Tropical Storm energy drink.'
    },
    {
      year: '2022',
      title: 'International Expansion',
      description: 'Expanded to 25+ countries across Europe and Asia.'
    },
    {
      year: '2023',
      title: 'Research Breakthrough',
      description: 'Developed our proprietary energy formula with 6+ hour sustained focus.'
    },
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Achieved 10M+ cans sold and 99% customer satisfaction rate.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Scientific Officer',
      specialty: 'Nutrition Science',
      bio: 'Leading our research team with 15+ years in sports nutrition and energy metabolism.',
      image: '👩‍🔬'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product Development',
      specialty: 'Flavor Chemistry',
      bio: 'Expert in creating unique flavor profiles that consumers love.',
      image: '👨‍🍳'
    },
    {
      name: 'Emma Thompson',
      role: 'Director of Operations',
      specialty: 'Supply Chain',
      bio: 'Ensuring quality and efficiency across our global operations.',
      image: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Hero Section with Swiper Cubes */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
                <span className="text-blue-400">ℹ️</span>
                <span className="text-blue-300 text-sm font-medium">Our Story</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                About
                <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  WAW Energy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                We're not just another energy drink company. We're innovators, scientists, and athletes 
                committed to delivering the ultimate energy experience.
              </p>
            </motion.div>

            {/* Swiper Cubes Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Our Premium Product Collection</h2>
              <div className="grid grid-flow-col auto-cols-max justify-center gap-4">
                <SwiperCube 
                  images={productImages} 
                  delay={2000}
                  size="xl"
                />
                <SwiperCube 
                  images={productImages} 
                  delay={3000}
                  size="xl"
                />
                <SwiperCube 
                  images={productImages} 
                  delay={2500}
                  size="xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-blue-200 mb-6 leading-relaxed">
              To provide premium energy solutions that enhance human performance while maintaining the highest 
              standards of quality, safety, and sustainability.
            </p>
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              We believe everyone deserves access to clean, effective energy that supports their goals 
              without compromising their health or the environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              From startup to global energy leader.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-blue-500 to-blue-500 hidden lg:block" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 hidden lg:block" />
                
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                  <div className="bg-slate-800 rounded-xl p-6 border border-blue-600/30">
                    <span className="text-2xl font-bold text-blue-400">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-2">{milestone.title}</h3>
                    <p className="text-blue-200">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="elevated" className="text-center p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                  <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1">
                    <span className="text-blue-400 text-xs font-medium">{member.specialty}</span>
                  </div>
                  <p className="text-blue-200 text-sm mt-4 leading-relaxed">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-blue-500/10">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Join the WAW Energy Family</h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Experience the difference that passion, innovation, and dedication make in every can.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="xl"
                icon="🛍️"
                iconPosition="left"
                className="shadow-lg shadow-blue-500/25"
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="xl"
                icon="📞"
                iconPosition="left"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
