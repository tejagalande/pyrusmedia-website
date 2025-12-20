import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Palette, Globe, Smartphone, Bot, ArrowRight } from 'lucide-react';
import Section from '../common/Section';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: Megaphone,
        title: 'Digital Marketing',
        desc: ['Social Media Strategy', 'Performance Ads (Meta/Google)', 'Analytics & Reporting'],
        path: '/services/digital-marketing',
        color: 'text-orange-400',
        gradient: 'from-orange-500/20 to-red-500/5'
    },
    {
        icon: Palette,
        title: 'UX/UI Design',
        desc: ['User Research & Wireframing', 'Interactive Prototyping', 'Visual Identity Systems'],
        path: '/services/ui-ux-design',
        color: 'text-pink-400',
        gradient: 'from-pink-500/20 to-rose-500/5'
    },
    {
        icon: Globe,
        title: 'Web Development',
        desc: ['Custom Web Applications', 'Responsive Frontend', 'Scalable Backend Systems'],
        path: '/services/web-development',
        color: 'text-blue-400',
        gradient: 'from-blue-500/20 to-cyan-500/5'
    },
    {
        icon: Smartphone,
        title: 'Mobile Development',
        desc: ['iOS & Android Apps', 'Cross-Platform (Flutter)', 'App Store Optimization'],
        path: '/services/mobile-development',
        color: 'text-green-400',
        gradient: 'from-green-500/20 to-emerald-500/5'
    },
    {
        icon: Bot,
        title: 'AI Automation',
        desc: ['Process Automation', 'Chatbot Integration', 'Data Analysis Solutions'],
        path: '/services/ai-automation',
        color: 'text-[#bebd19]',
        gradient: 'from-[#bebd19]/20 to-[#a3a215]/5'
    }
];

const ServicesOverview = () => {
    return (
        <Section className="bg-[#050505] relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Expertise</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Comprehensive digital solutions tailored to scale your business in the modern age.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative rounded-2xl p-[1px] overflow-hidden"
                    >
                        {/* Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-[#bebd19]/50 group-hover:to-[#a3a215]/50 transition-colors duration-500" />

                        <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-2xl hover:bg-[#0a0a0a]/80 transition-colors">

                            {/* Glow Highlight */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:ring-white/20 transition-all group-hover:scale-110 duration-300`}>
                                    <service.icon className={`w-7 h-7 ${service.color}`} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{service.title}</h3>

                                <ul className="mb-8 space-y-3">
                                    {service.desc.map((item, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                                            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${service.color.replace('text-', 'bg-')}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={service.path}
                                    className="inline-flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors"
                                >
                                    Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default ServicesOverview;
