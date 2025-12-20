import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import Button from '../common/Button';

const services = [
    { title: 'Digital Marketing', path: '/services/digital-marketing' },
    { title: 'UX/UI Design', path: '/services/ui-ux-design' },
    { title: 'Web App Development', path: '/services/web-development' },
    { title: 'Mobile App Development', path: '/services/mobile-development' },
    { title: 'AI Automation', path: '/services/ai-automation' },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsServiceDropdownOpen(false);
    }, [location]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center text-white">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#bebd19] to-[#a3a215] flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                        <span className="text-black font-bold text-xl">P</span>
                    </div>
                    <span>PYRUS<span className="text-[#bebd19]">MEDIA</span></span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-[#bebd19] transition-colors font-medium">Home</Link>
                    <Link to="/about" className="hover:text-[#bebd19] transition-colors font-medium">About</Link>

                    <div
                        className="relative group"
                        onMouseEnter={() => setIsServiceDropdownOpen(true)}
                        onMouseLeave={() => setIsServiceDropdownOpen(false)}
                    >
                        <button className="flex items-center gap-1 hover:text-[#bebd19] transition-colors py-2 font-medium">
                            Services <ChevronDown size={14} className={`transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isServiceDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4"
                                >
                                    <div className="glass-panel rounded-xl overflow-hidden p-2">
                                        {services.map((service) => (
                                            <Link
                                                key={service.path}
                                                to={service.path}
                                                className="block px-4 py-2 hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
                                            >
                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/e-learning" className="hover:text-[#bebd19] transition-colors font-medium">E-Learning</Link>
                    <Link to="/join-us" className="hover:text-[#bebd19] transition-colors font-medium">Join Us</Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button to="/contact" className="!py-2 !px-6 text-sm">
                        Book a Call
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-xl z-40 overflow-y-auto"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-2 text-white">
                            <Link to="/" className="text-xl font-medium py-3 border-b border-white/10">Home</Link>
                            <Link to="/about" className="text-xl font-medium py-3 border-b border-white/10">About</Link>

                            <div className="py-3 border-b border-white/10">
                                <div className="text-xl font-medium text-gray-400 mb-3">Services</div>
                                <div className="pl-4 flex flex-col gap-3">
                                    {services.map(s => (
                                        <Link key={s.path} to={s.path} className="text-base text-gray-300 hover:text-[#bebd19]">{s.title}</Link>
                                    ))}
                                </div>
                            </div>

                            <Link to="/e-learning" className="text-xl font-medium py-3 border-b border-white/10">E-Learning</Link>
                            <Link to="/join-us" className="text-xl font-medium py-3 border-b border-white/10">Join Us</Link>

                            <div className="mt-8">
                                <Button to="/contact" className="w-full justify-center">Book a Free Consultation</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
