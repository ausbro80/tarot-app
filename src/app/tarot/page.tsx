"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

const CARDS = [1, 2, 3];

export default function TarotPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setSelected(id);
        setTimeout(() => {
            // Navigate to result with a random card ID for demo
            // In real app, this would be determined by API or passed to API
            const randomCardId = Math.floor(Math.random() * 22); // 0-21 Major Arcana
            router.push(`/tarot/result?card=${randomCardId}`);
        }, 1500);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-950 p-4 relative overflow-hidden">
            {/* Background Stars */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Cat Astrologer Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="z-10 flex flex-col items-center mb-8"
            >
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=faces"
                        alt="Cute Cat Astrologer"
                        className="w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.6)] object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-white transform rotate-12 shadow-md">
                        Master Meow 🐱
                    </div>
                </div>

                <div className="bg-white/90 text-purple-900 px-6 py-3 rounded-2xl rounded-tl-none mt-4 shadow-lg max-w-xs text-center border-2 border-purple-200 relative">
                    <p className="font-bold">"Meow! Pick a card, any card!"</p>
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45 border-t-2 border-l-2 border-purple-200"></div>
                </div>
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 z-10 text-center drop-shadow-lg">
                <span className="text-lg font-normal text-indigo-200 block mb-2">
                    Focus on your question...
                </span>
            </h1>

            <div className="flex gap-4 md:gap-8 z-10">

                {CARDS.map((id) => (
                    <motion.div
                        key={id}
                        whileHover={{ y: -20, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCardClick(id)}
                        animate={selected === id ? { y: -50, rotateY: 180, opacity: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer"
                    >
                        <div className={`w-24 h-40 md:w-40 md:h-64 rounded-xl shadow-2xl border-4 ${selected === id ? "border-yellow-400" : "border-white/20"} bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden group`}>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <Sparkles className="text-white/30 group-hover:text-yellow-200 transition-colors" size={32} />
                            <div className="absolute bottom-2 text-xs text-white/50">Mystic Card</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center backdrop-blur-sm"
                >
                    <div className="text-white text-2xl font-bold animate-pulse">
                        Reading the stars...
                    </div>
                </motion.div>
            )}
        </main>
    );
}
