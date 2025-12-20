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
            <section className="bg-[#bebd19] py-16 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-black mb-6">Ready to start your project?</h2>
                    <Button to="/contact" className="bg-black text-[#bebd19] hover:bg-gray-900">
                        Get a Quote
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
