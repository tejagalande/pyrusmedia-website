import React from 'react';
import Section from '../common/Section';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
    {
        title: "FinTech Dashboard",
        category: "Web App Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        description: "A comprehensive financial analytics dashboard for a leading fintech startup."
    },
    {
        title: "EcoSmart Mobile App",
        category: "Mobile Application",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        description: "Award-winning sustainable lifestyle app with over 50k downloads."
    },
    {
        title: "Neon Data Viz",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // Fallback/Placeholder
        description: "Interactive 3D data visualization tools for enterprise clients."
    }
];

const PortfolioPreview = () => {
    return (
        <Section className="bg-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bebd19]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Check Out Our Work</h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            We take pride in delivering exceptional digital experiences. Here's a glimpse of what we've built.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-[#bebd19] font-bold hover:gap-4 transition-all">
                        View All Projects <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden bg-[#111] border border-gray-800 hover:border-[#bebd19] transition-all duration-500">
                            {/* Image Container */}
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <span className="text-xs font-bold text-[#bebd19] uppercase tracking-wider mb-2 block">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#bebd19] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {project.description}
                                </p>
                                <button className="flex items-center gap-2 text-white text-sm font-semibold hover:text-[#bebd19] transition-colors">
                                    View Case Study <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default PortfolioPreview;
