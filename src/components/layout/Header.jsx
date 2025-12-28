import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import Button from '../common/Button';

import logo from '../../assets/images/pyrus_media_logo.png';

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
    const navigate = useNavigate();

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

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center text-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="Pyrus Media" className="h-12 w-auto object-contain" />
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
                    className="md:hidden p-2 text-white text-3xl leading-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-black z-[60] overflow-y-auto flex flex-col"
                >
                    {/* Internal Mobile Header */}
                    <div className="flex justify-between items-center p-4 border-b border-white/10">
                        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <img src={logo} alt="Pyrus Media" className="h-10 w-auto object-contain" />
                        </Link>
                        <button
                            className="text-white text-3xl leading-none"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="container mx-auto px-4 py-8 flex flex-col gap-2 text-white">
                        <Link to="/" className="text-xl font-medium py-3 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/about" className="text-xl font-medium py-3 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>About</Link>

                        <div className="py-3 border-b border-white/10">
                            <div className="text-xl font-medium text-gray-400 mb-3">Services</div>
                            <div className="pl-4 flex flex-col gap-3">
                                {services.map(s => (
                                    <Link key={s.path} to={s.path} className="text-base text-gray-300 hover:text-[#bebd19]" onClick={() => setIsMobileMenuOpen(false)}>{s.title}</Link>
                                ))}
                            </div>
                        </div>

                        <Link to="/e-learning" className="text-xl font-medium py-3 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>E-Learning</Link>
                        <Link to="/join-us" className="text-xl font-medium py-3 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Join Us</Link>

                        <div className="mt-8">
                            <Link
                                to="/contact"
                                className="w-full justify-center btn btn-primary flex items-center py-3 rounded-full font-bold bg-[#bebd19] text-black hover:bg-[#d4d325] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Book a Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
