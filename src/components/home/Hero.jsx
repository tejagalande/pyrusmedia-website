import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroBg from '../../assets/images/hero-bg-fluid.png';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-black">
                <img
                    src={heroBg}
                    alt="Abstract Fluid Neon Background"
                    className="w-full h-full object-cover opacity-80 mix-blend-normal"
                />
            </div>

            {/* Mesh Grid Overlay */}
            {/* Overlay Gradient for Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-0" />

            <div className="container mx-auto px-4 relative z-10 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#bebd19]/30 bg-[#bebd19]/10 backdrop-blur-sm mb-8"
                >
                    <Sparkles size={16} className="text-[#bebd19]" />
                    <span className="text-sm font-semibold text-[#bebd19]">Reshaping the Digital Future</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[1.1] mb-8"
                >
                    Build Faster <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bebd19] via-[#fff] to-[#bebd19] animate-gradient-x">
                        Scale Smarter
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    We engineer high-performance websites, mobile apps, and AI solutions that transform businesses into industry leaders.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Button to="/contact" className="w-full sm:w-auto text-lg px-10 py-4 shadow-[0_0_40px_-10px_rgba(190,189,25,0.4)]">
                        Start Your Project
                    </Button>
                    <Button to="/services" variant="outline" className="w-full sm:w-auto text-lg px-10 py-4 group">
                        Explore Services <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                </motion.div>

                {/* Stats / Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { label: 'Happy Clients', value: '50+' },
                        { label: 'Projects Shipped', value: '120+' },
                        { label: 'Years Experience', value: '5+' },
                        { label: 'Team Experts', value: '15+' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
