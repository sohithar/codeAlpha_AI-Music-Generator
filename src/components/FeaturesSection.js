import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎵',
    title: 'AI Melody Creation',
    description: 'Generate original melodies using advanced neural networks trained on classical and modern music.',
    color: 'from-neon-purple to-neon-pink',
  },
  {
    icon: '🎹',
    title: 'MIDI Generation',
    description: 'Create complete MIDI sequences with multiple instruments and layers automatically.',
    color: 'from-neon-pink to-neon-cyan',
  },
  {
    icon: '📊',
    title: 'Smart Beat Detection',
    description: 'Advanced algorithms detect and synchronize with existing audio beats and patterns.',
    color: 'from-neon-cyan to-neon-blue',
  },
  {
    icon: '🎨',
    title: 'Real-time Visualization',
    description: 'Watch your music come alive with stunning real-time visual representations and animations.',
    color: 'from-neon-blue to-neon-purple',
  },
  {
    icon: '💾',
    title: 'Audio Export',
    description: 'Export your creations in multiple formats including MP3, WAV, and MIDI files.',
    color: 'from-neon-purple to-neon-blue',
  },
  {
    icon: '🧠',
    title: 'Neural Network Training',
    description: 'Train custom AI models with your own music samples and datasets.',
    color: 'from-neon-pink to-neon-purple',
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="features" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-gradient">Powerful Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to create professional-quality music with AI
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--color1), var(--color2))`,
                  '--color1': feature.color.split(' ')[2],
                  '--color2': feature.color.split(' ')[4],
                }}
              />
              
              <div className="relative glass-dark p-8 rounded-2xl border border-neon-purple/20 group-hover:border-neon-purple/50 transition-all duration-300 h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-2xl">✨</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
    </section>
  );
};

export default FeaturesSection;
