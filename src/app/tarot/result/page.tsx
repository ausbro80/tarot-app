"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, RefreshCw, Share2 } from "lucide-react";

// Mock Data for Tarot Cards (Rider-Waite Deck - Major Arcana)
const TAROT_DATA: Record<number, { name: string; meaning: string; image: string }> = {
    0: { name: "The Fool", meaning: "New beginnings, optimism, trust in life.", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
    1: { name: "The Magician", meaning: "Action, the power to manifest.", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
    2: { name: "The High Priestess", meaning: "Intuition, higher powers, mystery.", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
    3: { name: "The Empress", meaning: "Fertility, femininity, beauty, nature.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
    4: { name: "The Emperor", meaning: "Authority, father-figure, structure.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
    5: { name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
    6: { name: "The Lovers", meaning: "Partnership, union, duality, choice.", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg" },
    7: { name: "The Chariot", meaning: "Direction, control, willpower.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
    8: { name: "Strength", meaning: "Inner strength, bravery, compassion, focus.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
    9: { name: "The Hermit", meaning: "Contemplation, search for truth, inner guidance.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
    10: { name: "Wheel of Fortune", meaning: "Change, cycles, inevitable fate.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
    11: { name: "Justice", meaning: "Cause and effect, clarity, truth.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
    12: { name: "The Hanged Man", meaning: "Sacrifice, release, martyrdom.", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
    13: { name: "Death", meaning: "End of a cycle, beginnings, change, metamorphosis.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
    14: { name: "Temperance", meaning: "Middle path, patience, finding meaning.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
    15: { name: "The Devil", meaning: "Addiction, materialism, playfulness.", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
    16: { name: "The Tower", meaning: "Sudden upheaval, broken pride, disaster.", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
    17: { name: "The Star", meaning: "Hope, faith, rejuvenation.", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
    18: { name: "The Moon", meaning: "Unconscious, illusions, intuition.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
    19: { name: "The Sun", meaning: "Joy, success, celebration, positivity.", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
    20: { name: "Judgment", meaning: "Reflection, reckoning, awakening.", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
    21: { name: "The World", meaning: "Fulfillment, harmony, completion.", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" },
};

const ADVICE_TEMPLATES = [
    "This is a powerful sign to trust your intuition.",
    "You are on the verge of a breakthrough, keep going!",
    "Take a moment to reflect before acting.",
    "Someone close to you will bring good news soon.",
    "The universe is aligning to support your next move.",
    "Be careful of illusions; see things as they really are.",
    "Your creative energy is at its peak today.",
    "A surprise opportunity is coming—be ready to say yes!",
    "Patience is your best weapon right now.",
    "Let go of what no longer serves you."
];

const LUCKY_TIPS = [
    "🍀 Lucky Color: Royal Blue",
    "🍀 Lucky Color: Golden Yellow",
    "🍀 Lucky Color: Mystery Purple",
    "🕰️ Lucky Time: 2:00 PM",
    "🕰️ Lucky Time: Sunset",
    "🧭 Direction: East",
    "🧭 Direction: North",
    "💎 Item: Silver Ring",
    "💎 Item: Old Photo"
];

function generateFortune(cardName: string, baseMeaning: string) {
    const randomAdvice = ADVICE_TEMPLATES[Math.floor(Math.random() * ADVICE_TEMPLATES.length)];
    const randomTip = LUCKY_TIPS[Math.floor(Math.random() * LUCKY_TIPS.length)];

    return `**${cardName}** has appeared for you.\n\n` +
        `"${baseMeaning}"\n\n` +
        `✨ **Oracle's Advice:**\n${randomAdvice}\n\n` +
        `bonustip\n${randomTip}`;
}

function ResultContent() {
    const searchParams = useSearchParams();
    const cardId = parseInt(searchParams.get("card") || "0");
    const [fortune, setFortune] = useState<string>("");

    const card = TAROT_DATA[cardId] || TAROT_DATA[0];

    useEffect(() => {
        // Simulate thinking time
        const timer = setTimeout(() => {
            setFortune(generateFortune(card.name, card.meaning));
        }, 1000);
        return () => clearTimeout(timer);
    }, [card]);

    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
                className="mb-6 drop-shadow-2xl relative group"
            >
                <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg shadow-xl">
                    <img
                        src={card.image}
                        alt={card.name}
                        className="w-48 md:w-64 rounded-lg border-2 border-white/50"
                    />
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-indigo-900 mb-2"
            >
                {card.name}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-white/80 p-6 rounded-2xl shadow-xl max-w-md text-center text-indigo-800 mb-8 backdrop-blur-sm border border-indigo-100"
            >
                <p className="whitespace-pre-line text-lg leading-relaxed">{fortune || "✨ Consulting the stars..."}</p>
            </motion.div>

            <div className="flex gap-4">
                <Link href="/tarot">
                    <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-bold transition-colors">
                        <RefreshCw size={20} /> Again
                    </button>
                </Link>
                <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
                    <Share2 size={20} /> Share Luck
                </button>
            </div>

            {/* Ad Placeholder */}
            <div className="mt-12 w-full max-w-sm h-32 bg-gray-100/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 text-sm">
                [Ad Space: Google AdSense]
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-200 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResultContent />
            </Suspense>
        </main>
    );
}
