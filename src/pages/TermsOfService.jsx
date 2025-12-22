import React from 'react';
import Section from '../components/common/Section';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | PyrusMedia</title>
                <meta name="description" content="Terms of Service for PyrusMedia" />
            </Helmet>
            <Section className="bg-black pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-gray-300">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                            <p className="leading-relaxed">
                                By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                            <p className="leading-relaxed mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on PyrusMedia's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>modify or copy the materials;</li>
                                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                <li>attempt to decompile or reverse engineer any software contained on PyrusMedia's website;</li>
                                <li>remove any copyright or other proprietary notations from the materials; or</li>
                                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                            <p className="leading-relaxed">
                                The materials on PyrusMedia's website are provided on an 'as is' basis. PyrusMedia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                            <p className="leading-relaxed">
                                In no event shall PyrusMedia or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PyrusMedia's website, even if PyrusMedia or a PyrusMedia authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
                            <p className="leading-relaxed">
                                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default TermsOfService;
