import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { Briefcase, Heart, Globe, Zap } from 'lucide-react';
import { DataContext } from '../context/DataProvider';

const benefits = [
    { icon: Globe, title: 'Remote First', desc: 'Work from anywhere in the world.' },
    { icon: Zap, title: 'Real Impact', desc: 'Work on projects that matter.' },
    { icon: Heart, title: 'Growth', desc: 'Continuous learning and mentorship.' },
];

const JoinUs = () => {
    const { jobs: positions, loading } = useContext(DataContext);
    const [formData, setFormData] = useState({ name: '', email: '', role: '', portfolio: '', message: '', resume: null });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Strict Validation
        if (formData.resume && formData.resume.type !== 'application/pdf') {
            alert('Error: Please upload a valid PDF file.');
            return;
        }

        console.log('Application Submitted:', formData);
        if (formData.resume) {
            console.log('Resume File:', formData.resume.name);
        }
        alert('Thank you for your application! We will be in touch soon.');
        setFormData({ name: '', email: '', role: '', portfolio: '', message: '', resume: null });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are allowed.');
                e.target.value = null; // Reset input
                setFormData({ ...formData, resume: null });
                return;
            }
            setFormData({ ...formData, resume: file });
        }
    };

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
                            {loading ? (
                                <div className="text-gray-400 py-10 text-center">Loading open positions...</div>
                            ) : positions.length > 0 ? (
                                positions.map((pos, i) => (
                                    <div key={i} className="p-6 bg-[#111] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white mb-2">{pos.title}</h3>
                                            <span className="text-xs bg-[#bebd19]/10 text-[#bebd19] px-2 py-1 rounded">{pos.type}</span>
                                        </div>
                                        <p className="text-gray-400 mb-4">{pos.desc}</p>
                                        <button className="text-[#bebd19] text-sm font-semibold hover:text-white transition-colors">
                                            Apply Now &rarr;
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 bg-[#111] rounded-xl border border-gray-800 border-dashed text-center">
                                    <p className="text-gray-400">No open positions at the moment.</p>
                                    <p className="text-sm text-gray-500 mt-2">Feel free to send us your resume anyway!</p>
                                </div>
                            )}
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
                                    <label className="block text-gray-400 text-sm mb-2">Upload Resume (PDF only)</label>
                                    <input
                                        type="file"
                                        name="resume"
                                        accept="application/pdf, .pdf"
                                        onChange={handleFileChange}
                                        className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#bebd19] file:text-black hover:file:bg-[#a3a215] cursor-pointer"
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
