import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${['#a855f7', '#ec4899', '#0ea5e9', '#06b6d4'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;

      container.appendChild(particle);
      particlesRef.current.push(particle);

      // Animate each particle
      gsap.to(particle, {
        duration: Math.random() * 30 + 20,
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        opacity: 0,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particlesRef.current.forEach(p => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
