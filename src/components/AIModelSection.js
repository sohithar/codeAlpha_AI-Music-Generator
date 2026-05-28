import React from 'react';
import { motion } from 'framer-motion';

const AIModelSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-gradient">Neural Network</span> Architecture
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powered by state-of-the-art LSTM and Transformer models
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: 'Input Layer',
              description: 'Raw audio features and MIDI data',
              icon: '📥',
            },
            {
              title: 'LSTM Layers',
              description: 'Long short-term memory networks for sequence learning',
              icon: '🧠',
            },
            {
              title: 'Output Layer',
              description: 'Generated music sequences and patterns',
              icon: '📤',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-300" />
              
              <div className="relative glass-dark p-8 rounded-2xl border border-neon-purple/20 group-hover:border-neon-pink/50 transition-all duration-300">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Data flow visualization */}
        <motion.div
          className="relative bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent rounded-2xl p-12 glass-dark border border-neon-purple/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {['Input', 'Embedding', 'LSTM', 'Dense', 'Output'].map((stage, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="text-center p-4 rounded-xl glass border border-neon-purple/50"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <p className="font-bold text-neon-purple">{stage}</p>
                </motion.div>
                
                {index < 4 && (
                  <motion.div
                    className="hidden md:flex justify-center"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <span className="text-2xl text-neon-pink">→</span>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-cyan rounded-full"
                style={{
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 50}%`,
                }}
                animate={{
                  x: [0, 400, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Code snippet preview */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Model Architecture</h3>
          <div className="bg-cyberpunk-dark border border-neon-cyan/20 rounded-lg p-6 glass-dark font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              <motion.code
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
{`model = Sequential([
  Embedding(10000, 128),
  LSTM(256, return_sequences=True),
  Dropout(0.2),
  LSTM(256),
  Dense(256, activation='relu'),
  Dense(128, activation='relu'),
  Dense(output_dim, activation='softmax')
])

model.compile(
  optimizer='adam',
  loss='categorical_crossentropy',
  metrics=['accuracy']
)`}
              </motion.code>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Background animations */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 bg-neon-purple rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 35, repeat: Infinity }}
      />
    </section>
  );
};

export default AIModelSection;
