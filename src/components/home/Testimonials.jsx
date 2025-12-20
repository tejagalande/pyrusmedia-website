import React from 'react';
import Section from '../common/Section';
import Carousel from '../common/Carousel';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CEO, TechStart Inc.",
        content: "PyrusMedia completely transformed our digital presence. Their team is professional, fast, and incredibly talented."
    },
    {
        name: "Michael Smith",
        role: "Founder, GrowthLabs",
        content: "The ROI we've seen since launching our new app is incredible. I highly recommend PyrusMedia for any development needs."
    },
    {
        name: "Emily Wilson",
        role: "Marketing Director, EcoLife",
        content: "Their strategic insights generated double the leads we were expecting. Absolutely exceeded our expectations!"
    }
];

const Testimonials = () => {
    const testimonialItems = testimonials.map((t, i) => (
        <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-3xl text-center relative mx-auto max-w-2xl">
            <Quote className="w-12 h-12 text-[#bebd19] opacity-20 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed mb-8">
                "{t.content}"
            </p>
            <div>
                <h4 className="text-white font-bold text-lg">{t.name}</h4>
                <p className="text-[#bebd19] text-sm font-semibold">{t.role}</p>
            </div>
        </div>
    ));

    return (
        <Section className="bg-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#bebd19]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Client Success Stories</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Don't just take our word for it. Here's what our partners say about working with us.
                    </p>
                </div>

                <Carousel items={testimonialItems} autoPlay={true} interval={6000} />
            </div>
        </Section>
    );
};

export default Testimonials;
