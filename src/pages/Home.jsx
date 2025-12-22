import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';
import CTAFooter from '../components/home/CTAFooter';
import PortfolioPreview from '../components/home/PortfolioPreview';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>PyrusMedia | Digital Solutions & AI Automation</title>
                <meta name="description" content="Transform Your Business With Smart Digital, Mobile & AI Solutions." />
            </Helmet>

            <Hero />
            <ServicesOverview />
            <WhyChooseUs />
            <Process />
            <Testimonials />
            <PortfolioPreview />
            <CTAFooter />
        </>
    );
};

export default Home;
