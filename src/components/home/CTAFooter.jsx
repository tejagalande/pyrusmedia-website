import React from 'react';
import Section from '../common/Section';
import Button from '../common/Button';

const CTAFooter = () => {
    return (
        <Section className="bg-[#0a0a0a] border-t border-gray-800 text-center py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#bebd19]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to grow your business?</h2>
                <p className="text-gray-400 text-lg mb-10">
                    Book a free consultation today. We reply within 24 hours.
                </p>
                <Button to="/contact" className="bg-[#bebd19] text-black hover:bg-[#a3a215] hover:scale-105 shadow-[0_0_20px_rgba(190,189,25,0.3)] px-10 py-4 text-lg">
                    Book a Call Now
                </Button>
            </div>
        </Section>
    );
};

export default CTAFooter;
