"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100 p-4 text-center overflow-hidden relative">
      {/* Decorative Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 text-yellow-400 opacity-50"
      >
        <Star size={48} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 text-purple-300 opacity-50"
      >
        <Sparkles size={64} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center z-10"
      >
        <div className="text-6xl mb-6">🔮🐱</div>
        <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4 drop-shadow-sm">
          Magic Fortune
        </h1>
        <p className="text-lg md:text-xl text-purple-600 mb-8 max-w-md">
          "Meow! Let me read your stars today!"
          <br />
          <span className="text-sm opacity-75">Your cute AI fortune teller is ready.</span>
        </p>

        <Link href="/tarot">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg text-xl flex items-center gap-2 hover:shadow-xl transition-all"
          >
            <Sparkles size={24} />
            Start Reading
          </motion.button>
        </Link>

        {/* Footer / Credits */}
        <div className="mt-12 text-xs text-purple-400">
          Powered by AI Core • Made with ❤️
        </div>
      </motion.div>
    </main>
  );
}
