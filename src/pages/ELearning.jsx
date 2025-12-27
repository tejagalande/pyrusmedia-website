import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { BookOpen, Video, Users, Award } from 'lucide-react';
import { DataContext } from '../context/DataProvider';

const ELearning = () => {
    const { courses, loading } = useContext(DataContext);
    return (
        <>
            <Helmet>
                <title>E-Learning & Resources | PyrusMedia</title>
                <meta name="description" content="Upskill with our practical courses on mobile dev, digital marketing, and AI." />
            </Helmet>

            <section className="pt-32 pb-20 bg-black text-center relative">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">E-Learning & Resources</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Practical, implementation-focused learning content to help you stay ahead.
                    </p>
                </div>
            </section>

            <Section className="bg-[#050505]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-400 text-xl">Loading courses...</p>
                        </div>
                    ) : courses.length > 0 ? (
                        courses.map((course, i) => (
                            <div key={i} className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#bebd19] transition-colors flex flex-col">
                                {/* Thumbnail */}
                                <div className="h-48 bg-gray-900 relative">
                                    {course.thumbnail_url ? (
                                        <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute top-4 right-4">
                                            <span className="text-xs font-bold px-2 py-1 bg-[#bebd19]/10 text-[#bebd19] rounded uppercase">
                                                Free
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold px-2 py-1 bg-blue-900/30 text-blue-400 rounded uppercase">
                                            {course.level}
                                        </span>
                                        <span className="text-gray-400 text-sm">{course.format}</span>
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-[#bebd19] transition-colors"
                                        onClick={() => window.open(`/e-learning/course/${course.id}`, '_blank')}
                                    >
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: course.desc.replace(/<[^>]*>?/gm, '') }}></p>
                                </div>
                                <div className="p-6 pt-0 mt-auto flex justify-between items-center border-t border-gray-800/50">
                                    <span className="text-white font-bold text-lg">{course.price}</span>
                                    <Button variant={course.status === 'Enroll Now' ? 'primary' : 'outline'} className="text-sm px-4 py-2">
                                        {course.status}
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-[#111] rounded-2xl border border-gray-800 border-dashed">
                            <p className="text-gray-400 text-xl mb-2">No courses available yet.</p>
                            <p className="text-gray-500">Please check back later for new content.</p>
                        </div>
                    )}
                </div>
            </Section>

            <Section className="bg-[#0a0a0a]">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Learn With Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                        <div className="flex items-start gap-4">
                            <Video className="text-[#bebd19] w-8 h-8" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">High Quality Video</h3>
                                <p className="text-gray-400">Crisp 4K video lessons with clear audio.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                        <div className="flex items-start gap-4">
                            <BookOpen className="text-[#e5e48d] w-8 h-8" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Practical Exercises</h3>
                                <p className="text-gray-400">Hands-on projects to build your portfolio.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                        <div className="flex items-start gap-4">
                            <Award className="text-[#bebd19] w-8 h-8" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Certification</h3>
                                <p className="text-gray-400">Earn a certificate upon course completion.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Button className="px-10 py-4">Join E-Learning Hub</Button>
                </div>
            </Section>
        </>
    );
};

export default ELearning;
