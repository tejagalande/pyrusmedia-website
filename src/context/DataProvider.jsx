import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Initial Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: coursesData, error: coursesError } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false });

            if (coursesError) throw coursesError;
            setCourses(coursesData || []);

            const { data: jobsData, error: jobsError } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });

            if (jobsError) throw jobsError;
            setJobs(jobsData || []);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Actions
    const addCourse = async (course) => {
        try {
            // Remove any id if present to let DB handle it, and ensure we only send schema fields
            const { id, ...courseData } = course;
            const { data, error } = await supabase
                .from('courses')
                .insert([courseData])
                .select();

            if (error) throw error;
            if (data) setCourses([data[0], ...courses]);
            return { success: true };
        } catch (error) {
            console.error('Error adding course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const deleteCourse = async (id) => {
        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCourses(courses.filter(course => course.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const updateCourse = async (updatedCourse) => {
        try {
            // Extract id and created_at to avoid sending them in the update body
            const { id, created_at, ...updates } = updatedCourse;

            if (!id) {
                throw new Error("Cannot update course: Missing ID");
            }

            const { error } = await supabase
                .from('courses')
                .update(updates)
                .eq('id', id);

            if (error) throw error;

            // In local state, we use the full object including ID
            setCourses(courses.map(course => (course.id === id ? { ...course, ...updates } : course)));
            return { success: true };
        } catch (error) {
            console.error('Error updating course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const addJob = async (job) => {
        try {
            // Clean up job object. 'role' property was added in AdminDashboard but not in schema.
            // Also remove id if present.
            const { id, role, ...jobData } = job;
            const { data, error } = await supabase
                .from('jobs')
                .insert([jobData])
                .select();

            if (error) throw error;
            if (data) setJobs([data[0], ...jobs]);
            return { success: true };
        } catch (error) {
            console.error('Error adding job:', error.message);
            return { success: false, message: error.message };
        }
    };

    const deleteJob = async (id) => {
        try {
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setJobs(jobs.filter(job => job.id !== id));
            return { success: true };
        } catch (error) {
            console.error('Error deleting job:', error.message);
            return { success: false, message: error.message };
        }
    };

    const updateJob = async (updatedJob) => {
        try {
            // Remove role if present to avoid schema error during update
            const { role, ...cleanJob } = updatedJob;
            const { error } = await supabase
                .from('jobs')
                .update(cleanJob)
                .eq('id', updatedJob.id);

            if (error) throw error;
            setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
            return { success: true };
        } catch (error) {
            console.error('Error updating job:', error.message);
            return { success: false, message: error.message };
        }
    };

    return (
        <DataContext.Provider value={{ courses, addCourse, deleteCourse, updateCourse, jobs, addJob, deleteJob, updateJob, loading }}>
            {children}
        </DataContext.Provider>
    );
};
