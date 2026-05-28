import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: '🐙', label: 'GitHub', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' },
    { icon: '🐦', label: 'Twitter', url: '#' },
    { icon: '📧', label: 'Email', url: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative py-16 px-4 bg-gradient-to-t from-cyberpunk-dark to-transparent border-t border-neon-purple/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-black text-gradient">✨ AI MUSIC</h3>
            <p className="text-gray-400 max-w-xs">
              Revolutionary AI-powered music generation platform with stunning cyberpunk aesthetics.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  title={social.label}
                  className="w-10 h-10 rounded-full glass-dark border border-neon-purple/30 flex items-center justify-center text-lg hover:border-neon-pink/50 transition-all"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Features', 'Visualizer', 'Documentation', 'Contact'].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-neon-pink transition-colors font-medium"
                    whileHover={{ x: 5 }}
                  >
                    → {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              {['GitHub Repository', 'API Docs', 'Tutorials', 'Community'].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors font-medium"
                    whileHover={{ x: 5 }}
                  >
                    → {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent mb-8" />

        {/* Bottom footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} AI Music Generation. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <motion.a href="#" className="hover:text-neon-pink transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a href="#" className="hover:text-neon-pink transition-colors">
              Terms of Service
            </motion.a>
            <motion.a href="#" className="hover:text-neon-pink transition-colors">
              Cookie Policy
            </motion.a>
          </div>

          <motion.div
            className="text-sm font-semibold"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-gradient">Made with ✨ & 🚀</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple rounded-full mix-blend-multiply filter blur-3xl opacity-5 -z-10"
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl opacity-5 -z-10"
        animate={{ y: [0, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
    </footer>
  );
};

export default Footer;
