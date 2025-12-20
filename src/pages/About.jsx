import React from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import CTAFooter from '../components/home/CTAFooter';
import { Target, Lightbulb, Users } from 'lucide-react';
import aboutTeamImg from '../assets/images/about-team.png';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | PyrusMedia</title>
                <meta name="description" content="Learn more about PyrusMedia, our mission, vision, and the team driving digital transformation." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20 bg-black text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#bebd19]/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">About PyrusMedia</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We are a team of innovators dedicated to transforming businesses through cutting-edge digital solutions, mobile apps, and AI automation.
                    </p>
                </div>
            </section>

            {/* Story */}
            <Section className="bg-[#050505]">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            PyrusMedia started with a simple vision: to bridge the gap between complex technology and business growth.
                            Recognizing the rapid shift towards mobile-first and AI-driven economies, we gathered a team of experts
                            passionate about building robust web and mobile applications.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Today, we stand as a full-service digital agency, helping startups and established enterprises alike
                            to navigate the digital landscape with confidence and agility.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                            <div className="absolute inset-0 bg-[#bebd19]/10 mix-blend-overlay" />
                            <img
                                src={aboutTeamImg}
                                alt="PyrusMedia Team Collaboration"
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Mission & Vision */}
            <Section className="bg-[#0a0a0a]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                        <Target className="text-[#bebd19] w-12 h-12 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-gray-400 leading-relaxed">
                            To empower businesses by providing scalable, high-performance digital solutions that solve real-world problems and drive measurable growth.
                        </p>
                    </div>
                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                        <Lightbulb className="text-[#bebd19] w-12 h-12 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-gray-400 leading-relaxed">
                            To be the leading catalyst for digital transformation, recognized globally for innovation, quality, and a client-centric approach.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Team */}
            <Section className="bg-[#050505]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Meet The Team</h2>
                    <p className="text-gray-400">The minds behind the magic.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-800 border-4 border-gray-800 group-hover:border-[#bebd19] transition-colors">
                                <Users className="w-full h-full p-12 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Team Member {i}</h3>
                            <p className="text-[#bebd19]">Specialist Role</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTAFooter />
        </>
    );
};

export default About;
