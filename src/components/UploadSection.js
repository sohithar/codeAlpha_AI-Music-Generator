import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const midiFiles = files.filter(f => f.name.endsWith('.mid') || f.name.endsWith('.midi'));
    setUploadedFiles([...uploadedFiles, ...midiFiles]);
  };

  return (
    <section id="upload" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-gradient">Upload & Generate</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Drag and drop your MIDI files to enhance them with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <motion.div
            className={`relative p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
              isDragging
                ? 'border-neon-purple bg-neon-purple/10 scale-105'
                : 'border-neon-pink/50 bg-cyberpunk-gray/10 hover:border-neon-pink'
            } glass-dark`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-center min-h-64">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎵
              </motion.div>

              <h3 className="text-2xl font-bold mb-2 text-center text-white">
                Drop MIDI Files Here
              </h3>
              <p className="text-gray-400 text-center mb-6">
                or click to browse from your computer
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg font-bold text-white hover:shadow-lg neon-glow transition-all"
              >
                Browse Files
              </motion.button>

              <p className="text-xs text-gray-500 mt-6">
                Supported formats: .mid, .midi
              </p>
            </div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: isDragging
                  ? 'linear-gradient(135deg, #a855f7, #ec4899, #0ea5e9, #a855f7)'
                  : 'linear-gradient(135deg, #ec4899, #0ea5e9, #a855f7, #ec4899)',
                backgroundSize: '300% 300%',
                opacity: 0.2,
                filter: 'blur(1px)',
              }}
              animate={{ backgroundPosition: isDragging ? ['0% 0%', '100% 100%'] : ['100% 100%', '0% 0%'] }}
              transition={{ duration: isDragging ? 1 : 2, repeat: Infinity }}
              pointer-events="none"
            />
          </motion.div>

          {/* Uploaded Files & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">
                <span className="text-gradient">Process Your Music</span>
              </h3>

              <div className="space-y-6 mb-8">
                {[
                  {
                    step: '1',
                    title: 'Upload MIDI',
                    desc: 'Drop your MIDI file in the upload area'
                  },
                  {
                    step: '2',
                    title: 'AI Analysis',
                    desc: 'Our neural networks analyze your composition'
                  },
                  {
                    step: '3',
                    title: 'Generate',
                    desc: 'Create enhanced variations and new sections'
                  },
                  {
                    step: '4',
                    title: 'Download',
                    desc: 'Export your AI-enhanced music'
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
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.step}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-dark p-6 rounded-xl border border-neon-purple/30"
              >
                <h4 className="font-bold text-neon-purple mb-4">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm text-gray-300">
                      <span>🎵 {file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
    </section>
  );
};

export default UploadSection;
