import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { Briefcase, Heart, Globe, Zap } from 'lucide-react';

const positions = [
    { title: 'Freelance Flutter Developer', type: 'Remote / Contract', desc: 'Build beautiful cross-platform apps.' },
    { title: 'Senior UX/UI Designer', type: 'Remote / Full-time', desc: 'Lead our design system and client projects.' },
    { title: 'Sales Partner', type: 'Commission Based', desc: 'Help us find amazing clients to work with.' },
    { title: 'Campus Ambassador', type: 'Internship', desc: 'Represent PyrusMedia at your university.' },
];

const benefits = [
    { icon: Globe, title: 'Remote First', desc: 'Work from anywhere in the world.' },
    { icon: Zap, title: 'Real Impact', desc: 'Work on projects that matter.' },
    { icon: Heart, title: 'Growth', desc: 'Continuous learning and mentorship.' },
];

const JoinUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', role: '', portfolio: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Application Submitted:', formData);
        alert('Thank you for your application! We will be in touch soon.');
        setFormData({ name: '', email: '', role: '', portfolio: '', message: '' });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <Helmet>
                <title>Join Our Team | PyrusMedia</title>
                <meta name="description" content="Collaborate with us. We are looking for talented developers, designers, and partners." />
            </Helmet>

            <section className="pt-32 pb-20 bg-black text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">Join Our Team</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are looking for passionate individuals to build the future of digital with us.
                    </p>
                </div>
            </section>

            <Section className="bg-[#050505]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Opportunities & Benefits */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">What You Get</h2>
                        <div className="grid gap-6 mb-12">
                            {benefits.map((b, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                                        <b.icon className="text-[#bebd19] w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{b.title}</h3>
                                        <p className="text-gray-400">{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
                        <div className="space-y-4">
                            {positions.map((pos, i) => (
                                <div key={i} className="p-6 bg-[#111] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white mb-2">{pos.role}</h3>
                                        <span className="text-xs bg-[#bebd19]/10 text-[#bebd19] px-2 py-1 rounded">{pos.type}</span>
                                    </div>
                                    <p className="text-gray-400 mb-4">{pos.desc}</p>
                                    <button className="text-[#bebd19] text-sm font-semibold hover:text-white transition-colors">
                                        Apply Now &rarr;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Application Form */}
                    <div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 sticky top-24">
                            <h2 className="text-2xl font-bold text-white mb-6">Apply Now</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Role Applying For</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="flutter-dev">Freelance Flutter Developer</option>
                                        <option value="ui-ux">Senior UX/UI Designer</option>
                                        <option value="sales">Sales Partner</option>
                                        <option value="ambassador">Campus Ambassador</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Portfolio / LinkedIn URL</label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Why do you want to join us?</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19] transition-colors"
                                        required
                                    ></textarea>
                                </div>
                                <Button type="submit" className="w-full justify-center">Submit Application</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default JoinUs;
