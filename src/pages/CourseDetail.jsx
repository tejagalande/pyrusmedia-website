import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DataContext } from '../context/DataProvider';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

const CourseDetail = () => {
    const { courseId } = useParams();
    const { courses } = useContext(DataContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Handle both number and string IDs in case data source changes or URL param type varies
        const foundCourse = courses.find(c => c.id === parseInt(courseId) || c.id === courseId);
        if (foundCourse) {
            setCourse(foundCourse);
        }
    }, [courseId, courses]);

    if (!course) {
        return (
            <Section className="pt-32 pb-20 bg-black text-center h-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-white mb-4">Course Not Found</h1>
                <p className="text-gray-400 mb-8">The course you are looking for does not exist.</p>
                <Button onClick={() => navigate('/e-learning')} className="text-sm px-6 py-3">
                    Back to E-Learning
                </Button>
            </Section>
        );
    }

    return (
        <>
            <Helmet>
                <title>{course.title} | Course Detail</title>
                <meta name="description" content={`Detailed information about ${course.title} - ${course.desc}`} />
            </Helmet>

            <section className="pt-32 pb-20 bg-black text-center relative border-b border-gray-800">
                <div className="container mx-auto px-4">
                    <span className="inline-block mb-4 text-xs font-bold px-3 py-1 bg-[#bebd19]/10 text-[#bebd19] rounded uppercase tracking-wider">
                        {course.level}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">{course.title}</h1>

                    {course.thumbnail_url && (
                        <div className="max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden border border-gray-800">
                            <img src={course.thumbnail_url} alt={course.title} className="w-full h-auto" />
                        </div>
                    )}

                    <div
                        className="text-xl text-gray-400 max-w-2xl mx-auto prose prose-lg prose-invert [&_*]:!text-gray-400 [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_strong]:!text-white [&_li]:!text-gray-400 [&_ul]:!text-gray-400 [&_ol]:!text-gray-400"
                        dangerouslySetInnerHTML={{ __html: course.desc }}
                    />
                </div>
            </section>

            <Section className="bg-[#050505] min-h-[60vh]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center">
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wide text-sm">Format</h3>
                            <p className="text-white text-xl font-semibold">{course.format}</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center">
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wide text-sm">Price</h3>
                            <p className="text-[#bebd19] text-3xl font-bold">{course.price}</p>
                        </div>
                    </div>

                    <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Take your skills to the next level with this comprehensive course.
                            Join now and get instant access to all materials.
                        </p>
                        <Button
                            variant={course.status === 'Enroll Now' ? 'primary' : 'outline'}
                            className="text-lg px-8 py-3 w-full md:w-auto"
                        >
                            {course.status}
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default CourseDetail;
