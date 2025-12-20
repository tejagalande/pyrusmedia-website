import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ items, autoPlay = true, interval = 5000 }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, items.length]);

    const next = () => setCurrent((prev) => (prev + 1) % items.length);
    const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden px-4 md:px-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {items[current]}
                </motion.div>
            </AnimatePresence>

            <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-blue-500 w-4' : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
