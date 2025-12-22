import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-gray-300 pt-16 pb-8 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Info */}
                    <div>
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-white block mb-6">
                            PYRUS<span className="text-[#bebd19]">MEDIA</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Transforming businesses with smart digital, mobile, and AI solutions. We help you build modern apps and automate workflows.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/company/pyrus-media/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full hover:bg-[#bebd19] hover:text-black transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/pyrusmedia.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full hover:bg-red-600 hover:text-white transition-all">
                                <Youtube size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full hover:bg-[#bebd19] hover:text-black transition-all">
                                <Facebook size={20} />
                            </a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-[#bebd19] transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-[#bebd19] transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-[#bebd19] transition-colors">Services</Link></li>
                            <li><Link to="/e-learning" className="hover:text-[#bebd19] transition-colors">E-Learning</Link></li>
                            <li><Link to="/join-us" className="hover:text-[#bebd19] transition-colors">Join Us</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            <li><Link to="/services/digital-marketing" className="hover:text-blue-500 transition-colors">Digital Marketing</Link></li>
                            <li><Link to="/services/ui-ux-design" className="hover:text-blue-500 transition-colors">UX/UI Design</Link></li>
                            <li><Link to="/services/web-development" className="hover:text-blue-500 transition-colors">Web Development</Link></li>
                            <li><Link to="/services/mobile-development" className="hover:text-blue-500 transition-colors">Mobile Development</Link></li>
                            <li><Link to="/services/ai-automation" className="hover:text-blue-500 transition-colors">AI Automation</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                                <span>123 Tech Street, Silicon Valley, CA 94000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-blue-500 shrink-0" size={20} />
                                <a href="tel:+917720830178" className="hover:text-blue-400">+91 7720830178</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-blue-500 shrink-0" size={20} />
                                <a href="mailto:pyrusmediame@gmail.com" className="hover:text-blue-400">pyrusmediame@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {currentYear} PyrusMedia. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
