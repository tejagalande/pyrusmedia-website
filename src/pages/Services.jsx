import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import CTAFooter from '../components/home/CTAFooter';
import { Megaphone, Palette, Globe, Smartphone, Bot, ArrowRight } from 'lucide-react';
import servicesBg from '../assets/images/services-main.png';

const services = [
    {
        icon: Megaphone,
        title: 'Digital Marketing',
        desc: 'Social Media Strategy, Ads, Analytics',
        path: '/services/digital-marketing',
        color: 'text-orange-400',
        gradient: 'from-orange-500/20 to-red-500/5'
    },
    {
        icon: Palette,
        title: 'UX/UI Design',
        desc: 'User Research, Wireframing, Prototyping',
        path: '/services/ui-ux-design',
        color: 'text-pink-400',
        gradient: 'from-pink-500/20 to-rose-500/5'
    },
    {
        icon: Globe,
        title: 'Web Application Development',
        desc: 'Full-stack Web Apps, SaaS Solutions',
        path: '/services/web-development',
        color: 'text-[#bebd19]',
        gradient: 'from-[#bebd19]/20 to-[#a3a215]/5'
    },
    {
        icon: Smartphone,
        title: 'Mobile Application Development',
        desc: 'iOS, Android, Cross-platform Apps',
        path: '/services/mobile-development',
        color: 'text-[#d4d339]',
        gradient: 'from-[#d4d339]/20 to-[#b5b42b]/5'
    },
    {
        icon: Bot,
        title: 'AI Automation',
        desc: 'Chatbots, Process Automation, Data',
        path: '/services/ai-automation',
        color: 'text-[#e5e48d]',
        gradient: 'from-[#e5e48d]/20 to-[#bebd19]/5'
    }
];

const Services = () => {
    return (
        <>
            <Helmet>
                <title>Our Services | PyrusMedia</title>
                <meta name="description" content="Explore our comprehensive digital solutions." />
            </Helmet>

            <section className="pt-32 pb-20 relative overflow-hidden text-center min-h-[50vh] flex flex-col justify-center">
                <div className="absolute inset-0 bg-black">
                    <img src={servicesBg} alt="Digital Services Tech Nodes" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/80 to-black/60" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bebd19] to-yellow-500">Services</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                        We provide full-stack digital solutions tailored to your business needs, from design to deployment.
                    </p>
                </div>
            </section>

            <Section className="min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            to={service.path}
                            className="group relative rounded-2xl p-[1px] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-[#bebd19]/50 group-hover:to-[#a3a215]/50 transition-colors duration-500" />
                            <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-2xl hover:bg-[#0a0a0a]/80 transition-colors flex flex-col items-start">

                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 w-full">
                                    <service.icon className={`w-12 h-12 mb-6 ${service.color}`} />
                                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-gray-400 mb-6">{service.desc}</p>
                                    <span className="mt-auto flex items-center text-sm font-semibold text-white group-hover:text-[#bebd19] transition-colors">
                                        View details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <CTAFooter />
        </>
    );
};

export default Services;
