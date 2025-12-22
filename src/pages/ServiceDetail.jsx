import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { CheckCircle2, HelpCircle } from 'lucide-react';

const serviceData = {
    'digital-marketing': {
        title: 'Digital Marketing',
        summary: 'Data-driven strategies to boost your brand visibility and ROI.',
        problems: ['Low website traffic?', 'Poor conversion rates?', 'Undefined brand voice?'],
        included: [
            'Social media strategy and content planning',
            'Performance ads (Meta/Google)',
            'Landing pages & funnels',
            'Analytics and reporting'
        ],
        pricing: [
            {
                name: 'Basic Package',
                target: 'For startups & small teams',
                price: '₹15,000',
                period: '/ Monthly',
                features: [
                    '2 Social Media Platforms',
                    '12–15 Creative Posts per Month',
                    'Basic Hashtag & Keyword Strategy',
                    'Monthly Performance Report',
                    'Boosting Guidance (Ad Spend Extra)'
                ],
                buttonText: 'START FREE TRIAL',
                isPopular: false
            },
            {
                name: 'Growth Package',
                target: 'For medium-sized companies',
                price: '₹30,000 – ₹50,000',
                period: '/ Monthly',
                features: [
                    '3–4 Social Media Platforms',
                    '20–25 Posts per Month',
                    'Paid Ad Campaign Management',
                    'SEO Basics (On-page + Keyword)',
                    'Google My Business Optimization',
                    '2 Blogs / Articles per Month',
                    'Monthly Analytics Report',
                    'Email Marketing (1 campaign/month)'
                ],
                buttonText: 'START FREE TRIAL',
                isPopular: true
            },
            {
                name: 'Premium Package',
                target: 'Established Brands',
                price: '₹60,000 – ₹1,00,000',
                period: '/ Monthly',
                features: [
                    '5 Platforms',
                    '30+ Creative Posts (Graphics + Video)',
                    'Performance Marketing (Google, Meta, LinkedIn)',
                    'Advanced SEO (On-page, Off-page, Backlinks)',
                    '4 Blogs / Articles per Month',
                    'Influencer Collaboration Support',
                    'Competitor Analysis & Strategy',
                    'Monthly Reports + 1 Strategy Call'
                ],
                buttonText: 'START FREE TRIAL',
                isPopular: false
            }
        ],
        process: ['Audit', 'Strategy', 'Execution', 'Optimization'],
        faqs: [
            { q: 'How fast will I see results?', a: 'PPC can show results immediately, while SEO takes 3-6 months.' },
            { q: 'Do you handle creative content?', a: 'Yes, we create visuals and copy aligned with your brand.' }
        ]
    },
    'ui-ux-design': {
        title: 'UX/UI Design',
        summary: 'Crafting intuitive and beautiful user experiences that engage and convert.',
        problems: ['High bounce rates?', 'Confusing navigation?', 'Outdated aesthetics?'],
        included: [
            'User Research & Personas',
            'Wireframing & Prototyping',
            'Visual Design Systems',
            'Usability Testing'
        ],
        process: ['Research', 'Wireframe', 'Design', 'Test'],
        faqs: [
            { q: 'What tools do you use?', a: 'We primarily use Figma and Adobe XD.' },
            { q: 'Do you do redesigns?', a: 'Absolutely, we love refreshing existing products.' }
        ]
    },
    'web-development': {
        title: 'Web Application Development',
        summary: 'Scalable, secure, and high-performance web solutions for modern businesses.',
        problems: ['Slow loading times?', 'Not mobile friendly?', 'Hard to maintain?'],
        included: [
            'Custom Frontend (React, Vue, etc.)',
            'Robust Backend API',
            'Database Design',
            'Cloud Deployment'
        ],
        process: ['Architecture', 'Development', 'QA', 'Deployment'],
        faqs: [
            { q: 'Do you use WordPress?', a: 'We focus on custom stacks but can support CMS if needed.' },
            { q: 'Is hosting included?', a: 'We can set up hosting for you on AWS, Vercel, or others.' }
        ]
    },
    'mobile-development': {
        title: 'Mobile Application Development',
        summary: 'Native and cross-platform apps that deliver seamless mobile experiences.',
        problems: ['Need an iOS and Android app?', 'Performance issues?', 'App Store rejection?'],
        included: [
            'Flutter/React Native Development',
            'Native iOS/Android',
            'App Store Optimization (ASO)',
            'Maintenance & Updates'
        ],
        process: ['Prototype', 'Build', 'Beta Test', 'Launch'],
        faqs: [
            { q: 'Which technologies do you use?', a: 'We specialize in Flutter for efficient cross-platform delivery.' },
            { q: 'How long does it take?', a: 'Typically 3-6 months depending on complexity.' }
        ]
    },
    'ai-automation': {
        title: 'AI Automation',
        summary: 'Leverage Artificial Intelligence to automate workflows and gain insights.',
        problems: ['Repetitive manual tasks?', 'Data overload?', 'Slow customer support?'],
        included: [
            'Custom Chatbots',
            'Workflow Automation (Zapier/n8n)',
            'Data Analysis & Prediction',
            'AI Model Integration'
        ],
        process: ['Assessment', 'Prototype', 'Integration', 'Training'],
        faqs: [
            { q: 'Is it expensive?', a: 'We offer scalable solutions to fit various budgets.' },
            { q: 'Is my data secure?', a: 'Security is our top priority in all AI implementations.' }
        ]
    }
};

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const data = serviceData[serviceId];

    if (!data) {
        return <Navigate to="/services" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{data.title} | PyrusMedia</title>
                <meta name="description" content={data.summary} />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20 bg-black text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bebd19]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{data.title}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">{data.summary}</p>
                    <Button to="/contact" className="px-8 py-3 text-lg">Request a Proposal</Button>
                </div>
            </section>

            {/* Problems & Solutions */}
            <Section className="bg-[#050505]">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">Problems We Solve</h2>
                        <ul className="space-y-4">
                            {data.problems.map((prob, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 bg-[#111] p-4 rounded-lg border border-gray-800">
                                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                                    {prob}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
                        <ul className="space-y-4">
                            {data.included.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle2 className="text-[#bebd19] w-5 h-5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Process */}
            <Section className="bg-[#0a0a0a]">
                <h2 className="text-3xl font-bold text-white mb-10 text-center">Our Process</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.process.map((step, i) => (
                        <div key={i} className="text-center p-6 bg-[#111] rounded-xl border border-gray-800">
                            <div className="text-4xl font-bold text-gray-700 mb-2">0{i + 1}</div>
                            <div className="text-white font-semibold">{step}</div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Pricing Section (Conditional) */}
            {data.pricing && (
                <Section className="bg-[#050505]">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transparent Pricing</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Choose the package that fits your growth stage.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                        {data.pricing.map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${pkg.isPopular ? 'bg-[#1a1a1a] border-[#bebd19] transform md:-translate-y-4 shadow-[0_0_30px_rgba(190,189,25,0.15)]' : 'bg-[#111] border-gray-800 hover:border-gray-700'}`}
                            >
                                {pkg.isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#bebd19] text-black text-xs font-bold uppercase tracking-wider rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-6">{pkg.target}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-[#bebd19]">{pkg.price}</span>
                                        <span className="text-gray-500 text-sm">{pkg.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                            <CheckCircle2 className="text-[#bebd19] w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button to="/contact" className={`w-full justify-center ${pkg.isPopular ? 'bg-[#bebd19] text-black hover:bg-[#a3a215]' : 'bg-transparent border border-gray-700 hover:border-[#bebd19] hover:text-[#bebd19]'}`}>
                                    {pkg.buttonText}
                                </Button>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* FAQ */}
            <Section className="bg-[#050505]">
                <h2 className="text-3xl font-bold text-white mb-10 text-center">Common Questions</h2>
                <div className="max-w-3xl mx-auto grid gap-6">
                    {data.faqs.map((faq, i) => (
                        <div key={i} className="bg-[#111] p-6 rounded-xl border border-gray-800">
                            <div className="flex items-start gap-3 mb-2">
                                <HelpCircle className="text-[#bebd19] w-5 h-5 mt-1 shrink-0" />
                                <h3 className="text-lg font-bold text-white">{faq.q}</h3>
                            </div>
                            <p className="text-gray-400 pl-8">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <section className="bg-[#0a0a0a] border-t border-gray-800 text-center py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#bebd19]/5 blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your project?</h2>
                    <Button to="/contact" className="bg-[#bebd19] text-black hover:bg-[#a3a215] hover:scale-105 shadow-[0_0_20px_rgba(190,189,25,0.3)] px-10 py-4 text-lg">
                        Get a Quote
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
