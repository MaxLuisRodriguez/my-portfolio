import React from 'react';
import { motion } from 'framer-motion';

const NewsBand: React.FC = () => {
  const newsItems = [
    "No artificial flavors or coloring",
    "All natural ingredients",
    "Long lasting energy"
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-black/95 via-black/90 to-black/95 border-t-2 border-b-2" 
         style={{
           borderColor: '#ffd700',
           background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)',
           boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
           minHeight: '120px',
           paddingTop: '40px',
           paddingBottom: '40px'
         }}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5"></div>
      
      {/* Moving news items */}
      <div className="flex h-full">
        {/* First set of items */}
        <motion.div
          className="flex items-center whitespace-nowrap h-full"
          animate={{
            x: [0, -200]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // 40 seconds for slow movement
              ease: "linear"
            }
          }}
        >
          {newsItems.map((item, index) => (
            <span
              key={`first-${index}`}
              className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest"
              style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
                fontWeight: '900',
                marginRight: '200px'
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Second set of items (for seamless loop) */}
        <motion.div
          className="flex items-center whitespace-nowrap h-full"
          animate={{
            x: [0, -200]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }
          }}
        >
          {newsItems.map((item, index) => (
            <span
              key={`second-${index}`}
              className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest"
              style={{
                background: 'linear-gradient(145deg, #ffd700 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,215,0,0.4))',
                fontWeight: '900',
                marginRight: '200px'
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsBand;
