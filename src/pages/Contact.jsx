import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '',
        service: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.message) tempErrors.message = "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Contact Form Submitted:', formData);
            alert('Thank you for your message! We will reply within 24 hours.');
            setFormData({ name: '', email: '', phone: '', company: '', budget: '', service: '', message: '' });
            setErrors({});
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | PyrusMedia</title>
                <meta name="description" content="Get in touch with us for a free consultation or project quote." />
            </Helmet>

            <section className="pt-32 pb-20 bg-black text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">Let's Talk About Your Project</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ready to grow? Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                </div>
            </section>

            <Section className="bg-[#050505]">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <div className="lg:w-1/3 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <p className="text-gray-400 mb-8">
                                Have a question or want to discuss a partnership? We're here to help.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                                    <Mail className="text-[#bebd19] w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Email Us</h4>
                                    <a href="mailto:pyrusmediame@gmail.com" className="text-gray-400 hover:text-[#bebd19]">pyrusmediame@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                                    <Phone className="text-[#bebd19] w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Call / WhatsApp</h4>
                                    <a href="tel:+917720830178" className="text-gray-400 hover:text-[#bebd19]">+91 77208 30178</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                                    <MapPin className="text-red-500 w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Visit Us</h4>
                                    <p className="text-gray-400">123 Tech Street, Silicon Valley, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3 bg-[#111] p-8 md:p-10 rounded-2xl border border-gray-800">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name} onChange={handleChange}
                                    className={`w-full bg-black border rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19] ${errors.name ? 'border-red-500' : 'border-gray-800'}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email} onChange={handleChange}
                                    className={`w-full bg-black border rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19] ${errors.email ? 'border-red-500' : 'border-gray-800'}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Phone / WhatsApp</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone} onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company} onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Budget Range</label>
                                <select
                                    name="budget"
                                    value={formData.budget} onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19]"
                                >
                                    <option value="">Select Budget</option>
                                    <option value="under-1k">&lt; $1,000</option>
                                    <option value="1k-5k">$1,000 - $5,000</option>
                                    <option value="5k-10k">$5,000 - $10,000</option>
                                    <option value="10k+">$10,000+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Service Interested In</label>
                                <select
                                    name="service"
                                    value={formData.service} onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19]"
                                >
                                    <option value="">Select Service</option>
                                    <option value="marketing">Digital Marketing</option>
                                    <option value="design">UX/UI Design</option>
                                    <option value="web">Web Development</option>
                                    <option value="mobile">Mobile Development</option>
                                    <option value="ai">AI Automation</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-2">Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message} onChange={handleChange} rows="5"
                                    className={`w-full bg-black border rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19] ${errors.message ? 'border-red-500' : 'border-gray-800'}`}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full justify-center py-4 text-lg">Send Message</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default Contact;
