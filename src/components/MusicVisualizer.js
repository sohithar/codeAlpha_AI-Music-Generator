import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import CircularEqualizer from './3d/CircularEqualizer';

const MusicVisualizer = () => {
  const containerRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
      } catch (error) {
        console.log('Web Audio API not available:', error);
      }
    };

    initAudio();
  }, []);

  return (
    <section id="visualizer" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-gradient">3D Music Visualizer</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch your music transform into mesmerizing 3D animations
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 3D Visualizer */}
          <motion.div
            className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-dark border border-neon-purple/30"
            whileHover={{ borderColor: 'rgba(168, 85, 247, 0.8)' }}
          >
            <CircularEqualizer />
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold mb-6">
              <span className="text-gradient">Real-Time</span> Audio Analysis
            </h3>
            
            <div className="space-y-6 mb-8">
              {[
                {
                  title: 'Frequency Spectrum',
                  desc: 'Visualize the complete frequency spectrum from bass to treble'
                },
                {
                  title: 'Beat Detection',
                  desc: 'Automatic beat synchronization with particle effects'
                },
                {
                  title: 'Waveform Display',
                  desc: 'Live waveform animation matching your audio input'
                },
                {
                  title: 'Particle Effects',
                  desc: 'Hundreds of particles react to music intensity'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-3 h-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full mt-2 flex-shrink-0"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-bold text-white shadow-lg hover:shadow-xl neon-glow transition-all"
            >
              Try Visualizer
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background animation */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </section>
  );
};

export default MusicVisualizer;
