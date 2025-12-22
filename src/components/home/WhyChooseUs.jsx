import React from 'react';
import Section from '../common/Section';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
    {
        title: 'End-to-End Solutions',
        description: 'We handle everything from initial strategy-design to development and final deployment.'
    },
    {
        title: 'Fast & Agile Delivery',
        description: 'We use modern frameworks and agile methodologies to launch your project faster without compromising quality.'
    },
    {
        title: 'Transparent Communication',
        description: 'Regular updates and clear reporting so you are always in the loop about your project status.'
    },
    {
        title: 'Startup Focused',
        description: 'We understand the unique challenges of startups and small businesses, offering scalable solutions.'
    }
];

const WhyChooseUs = () => {
    return (
        <Section className="bg-[#0a0a0a]">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-4xl font-bold text-white mb-6">Why Partner With PyrusMedia?</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        We don't just build websites or apps; we build digital assets that drive growth and efficiency for your business.
                    </p>

                    <div className="grid gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4">
                                <CheckCircle2 className="text-blue-500 shrink-0 w-6 h-6" />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                                    <p className="text-gray-400">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointing-events-none" />
                    <div className="relative rounded-2xl border border-gray-800 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1000"
                            alt="Rocket taking off representing speed and growth"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default WhyChooseUs;
