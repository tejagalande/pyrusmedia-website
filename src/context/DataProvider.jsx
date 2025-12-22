import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

// Initial Data (Fallbacks if localStorage is empty)
const initialCourses = [
    {
        id: 1,
        title: 'Flutter for Beginners',
        desc: 'Build your first mobile app with Flutter and Dart. No prior experience required.',
        level: 'Beginner',
        format: 'Video Course',
        price: '$49',
        status: 'Enroll Now'
    },
    {
        id: 2,
        title: 'Mastering Digital Marketing',
        desc: 'Learn SEO, SEM, and Social Media strategies to grow any business.',
        level: 'Intermediate',
        format: 'Live Sessions',
        price: '$99',
        status: 'Coming Soon'
    },
    {
        id: 3,
        title: 'AI Automation Workflow',
        desc: 'Automate your business processes using n8n and OpenAI.',
        level: 'Advanced',
        format: 'Workshop',
        price: '$149',
        status: 'Waitlist'
    }
];

const initialJobs = [
    { id: 1, title: 'Freelance Flutter Developer', type: 'Remote / Contract', desc: 'Build beautiful cross-platform apps.' },
    { id: 2, title: 'Senior UX/UI Designer', type: 'Remote / Full-time', desc: 'Lead our design system and client projects.' },
    { id: 3, title: 'Sales Partner', type: 'Commission Based', desc: 'Help us find amazing clients to work with.' },
    { id: 4, title: 'Campus Ambassador', type: 'Internship', desc: 'Represent PyrusMedia at your university.' },
];

export const DataProvider = ({ children }) => {
    // Load from localStorage or use initial data
    const [courses, setCourses] = useState(() => {
        const saved = localStorage.getItem('pyrus_courses');
        return saved ? JSON.parse(saved) : initialCourses;
    });

    const [jobs, setJobs] = useState(() => {
        const saved = localStorage.getItem('pyrus_jobs');
        return saved ? JSON.parse(saved) : initialJobs;
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('pyrus_courses', JSON.stringify(courses));
    }, [courses]);

    useEffect(() => {
        localStorage.setItem('pyrus_jobs', JSON.stringify(jobs));
    }, [jobs]);

    // Actions
    const addCourse = (course) => {
        setCourses([...courses, { ...course, id: Date.now() }]);
    };

    const deleteCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const updateCourse = (updatedCourse) => {
        setCourses(courses.map(course => (course.id === updatedCourse.id ? updatedCourse : course)));
    };

    const addJob = (job) => {
        setJobs([...jobs, { ...job, id: Date.now() }]);
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    const updateJob = (updatedJob) => {
        setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    };

    return (
        <DataContext.Provider value={{ courses, addCourse, deleteCourse, updateCourse, jobs, addJob, deleteJob, updateJob }}>
            {children}
        </DataContext.Provider>
    );
};
