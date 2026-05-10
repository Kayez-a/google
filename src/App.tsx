/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, Flower2, Sprout, Loader2 } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<'gate' | 'lobby'>('gate');

  // Flower bloom logic: scale and opacity based on character count (max 200 chars for full bloom)
  const bloomProgress = Math.min(input.length / 200, 1);
  const flowerScale = 1 + bloomProgress * 0.8;
  const flowerOpacity = 0.3 + bloomProgress * 0.7;

  const handleEnter = async () => {
    if (input.length < 10) {
      setError('Ceritakan sedikit lebih banyak agar kami bisa mengenalmu');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsValidating(true);
    setError('');

    // Simulate "Mendengarkan ceritamu..."
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save to localStorage
    localStorage.setItem('amity_entry_text', input);

    // Start transition
    setIsValidating(false);
    setIsTransitioning(true);

    // Zoom-in + fade-out effect duration
    setTimeout(() => {
      setCurrentPage('lobby');
      setIsTransitioning(false);
      setInput('');
    }, 1500);
  };

  if (currentPage === 'lobby') {
    return (
      <div className="min-h-screen bg-sage-green/10 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-center space-y-6"
        >
          <h1 className="text-5xl font-serif text-sage-green font-bold">Selamat Datang di Pelabuhan</h1>
          <p className="text-gray-600 italic">"Terima kasih telah berbagi. Ruang ini sekarang milikmu juga."</p>
          <button 
            onClick={() => setCurrentPage('gate')}
            className="text-sage-green underline font-medium hover:text-sage-light transition-colors"
          >
            Kembali ke Gerbang
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          animate={{ scale: isTransitioning ? 1.5 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        >
          <source src="/162655-825914608_tiny.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      </div>

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key="gate-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl px-6"
          >
            <div className="glass-card rounded-[40px] p-12 relative overflow-hidden">
              {/* Decorative Flowers (Blooming Logic) */}
              <motion.div 
                style={{ scale: flowerScale, opacity: flowerOpacity }}
                className="absolute top-6 left-6 text-white/40"
              >
                <Flower className="w-8 h-8" />
              </motion.div>
              <motion.div 
                style={{ scale: flowerScale, opacity: flowerOpacity }}
                className="absolute top-6 right-6 text-white/40"
              >
                <Flower2 className="w-8 h-8" />
              </motion.div>
              <motion.div 
                style={{ scale: flowerScale, opacity: flowerOpacity }}
                className="absolute bottom-6 left-6 text-white/40"
              >
                <Sprout className="w-8 h-8" />
              </motion.div>
              <motion.div 
                style={{ scale: flowerScale, opacity: flowerOpacity }}
                className="absolute bottom-6 right-6 text-white/40"
              >
                <Flower2 className="w-8 h-8 rotate-45" />
              </motion.div>

              {/* Content */}
              <div className="flex flex-col items-center text-center space-y-8">
                <header className="space-y-2">
                  <h1 className="text-6xl font-serif tracking-tight mb-4">Amity</h1>
                  <h2 className="text-2xl font-medium">
                    Bagaimana perasaanmu hari ini?
                  </h2>

                  <p className="text-white/80 max-w-md mx-auto text-sm leading-relaxed">
                    <span className="block">
                      Ceritakan sedikit tentang apa yang membawamu ke sini.
                    </span>
                    <span className="block">
                      Ini adalah ruang amanmu.
                    </span>
                  </p>
                </header>

                <div className="w-full space-y-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ceritakan sedikit tentang harimu di sini..."
                    className="w-full h-40 bg-white/5 border border-white/20 rounded-2xl p-6 text-lg focus:outline-none focus:ring-0 placeholder:text-white/40 resize-none transition-all focus:bg-white/10"
                  />
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-pink-200 text-sm font-medium italic"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <button 
                  onClick={handleEnter}
                  disabled={isValidating}
                  className="liquid-glass-btn group min-w-[240px] flex items-center justify-center gap-2"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mendengarkan ceritamu...</span>
                    </>
                  ) : (
                    <span>Masuk ke Pelabuhan</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-white/30 text-xs tracking-widest uppercase">The Empathy Gate</p>
      </footer>
    </div>
  );
}
