import React from 'react';
import Section from '../common/Section';
import Button from '../common/Button';

const CTAFooter = () => {
    return (
        <Section className="bg-blue-600 text-white text-center py-20">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to grow your business?</h2>
                <p className="text-blue-100 text-lg mb-10">
                    Book a free consultation today. We reply within 24 hours.
                </p>
                <Button to="/contact" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl px-10 py-4 text-lg">
                    Book a Call Now
                </Button>
            </div>
        </Section>
    );
};

export default CTAFooter;
