import React from 'react';
import Section from '../common/Section';

const steps = [
    { number: '01', title: 'Discovery', desc: 'We analyze your requirements and business goals.' },
    { number: '02', title: 'Strategy & UI/UX', desc: 'We plan the roadmap and design high-fidelity prototypes.' },
    { number: '03', title: 'Development', desc: 'We build your solution using modern tech stacks.' },
    { number: '04', title: 'Testing', desc: 'Rigorous QA to ensure a bug-free experience.' },
    { number: '05', title: 'Launch', desc: 'We deploy your project and provide ongoing support.' },
];

const Process = () => {
    return (
        <Section className="bg-[#050505]">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
                <p className="text-gray-400">Simple, transparent, and effective workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {steps.map((step, index) => (
                    <div key={index} className="relative group text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xl font-bold text-blue-500 mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {step.number}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-400 px-2">{step.desc}</p>

                        {/* Connector Line (Desktop Only) */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[1px] bg-gray-800 -z-10 translate-x-[50%]" />
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Process;
