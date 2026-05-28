import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import VinylDisc from './3d/VinylDisc';

const HeroSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden pt-20 flex items-center justify-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left content */}
        <motion.div variants={containerVariants}>
          <motion.h1
            ref={titleRef}
            className="text-6xl lg:text-7xl font-black mb-6 leading-tight animate-neon-flicker"
          >
            <span className="text-gradient">AI Music</span>
            <br />
            <span className="text-white">Generation</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-8 leading-relaxed max-w-xl"
          >
            Harness the power of artificial intelligence to compose, generate, and transform music. Create unlimited tracks with neural networks trained on millions of musical patterns.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-bold text-white shadow-2xl hover:shadow-3xl neon-glow transition-all group"
            >
              <span className="flex items-center gap-2">
                ▶ Start Creating
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-neon-blue text-neon-blue rounded-lg font-bold hover:bg-neon-blue/10 transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Floating animated text */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex gap-8"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-neon-purple rounded-full"
              />
              <span className="text-sm font-semibold text-gray-300">Real-time Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-3 h-3 bg-neon-pink rounded-full"
              />
              <span className="text-sm font-semibold text-gray-300">AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="w-3 h-3 bg-neon-cyan rounded-full"
              />
              <span className="text-sm font-semibold text-gray-300">No Limits</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right content - 3D Vinyl */}
        <motion.div
          variants={itemVariants}
          className="relative h-96 lg:h-screen flex items-center justify-center"
        >
          <VinylDisc />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-neon-pink">
          <span className="text-sm font-semibold">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
