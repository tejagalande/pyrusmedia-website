import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    { q: 'How does your process work?', a: 'We follow a 4-step process: Discovery, Strategy & Design, Development, and Launch.' },
    { q: 'How long does a project take?', a: 'It depends on the scope. A simple website takes 2-4 weeks, while a custom app can take 3-6 months.' },
    { q: 'What is your pricing model?', a: 'We offer both fixed-price projects and hourly billing, depending on your preference and project type.' },
    { q: 'Do you work with international clients?', a: 'Yes, we work with clients globally. We use tools like Zoom and Slack to ensure smooth communication.' },
    { q: 'What tech stack do you use?', a: 'We primarily use React, Next.js, Node.js, and Flutter for mobile apps.' },
    { q: 'Do you offer post-launch support?', a: 'Yes, we offer maintenance packages to keep your website or app secure and up-to-date.' },
    { q: 'Do I own the code?', a: 'Yes, upon full payment, you own 100% of the intellectual property and code.' },
    { q: 'Can you update my existing site?', a: 'Absolutely. We can perform a full audit and suggest improvements or a complete redesign.' },
    { q: 'How do we track progress?', a: 'We provide weekly updates and access to a project management dashboard (like Trello or Jira).' },
    { q: 'Do you provide hosting?', a: 'We can set up hosting for you, but the recurring costs are typically paid directly to the provider (AWS, etc.).' },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Helmet>
                <title>FAQ | PyrusMedia</title>
                <meta name="description" content="Find answers to common questions about our services, process, and pricing." />
            </Helmet>

            <section className="pt-32 pb-20 bg-black text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about working with us.
                    </p>
                </div>
            </section>

            <Section className="bg-[#050505] min-h-[60vh]">
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-[#111] rounded-xl border transition-colors ${openIndex === index ? 'border-[#bebd19]' : 'border-gray-800'}`}
                        >
                            <button
                                className="w-full p-6 flex items-center justify-between text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-semibold text-white">{faq.q}</span>
                                {openIndex === index ? <Minus className="text-[#bebd19]" /> : <Plus className="text-gray-500" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-400 mb-6">Didn't find your answer?</p>
                    <Button to="/contact">Contact Support</Button>
                </div>
            </Section>
        </>
    );
};

export default FAQ;
