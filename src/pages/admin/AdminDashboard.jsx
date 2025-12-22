import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DataContext } from '../../context/DataProvider';
import Section from '../../components/common/Section';
import Button from '../../components/common/Button';
import { Plus, Trash2, LogOut, Edit2, X } from 'lucide-react';

const AdminDashboard = () => {
    const { courses, addCourse, deleteCourse, updateCourse, jobs, addJob, deleteJob, updateJob } = useContext(DataContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');
    const [editingId, setEditingId] = useState(null);

    // Auth Check
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    // Form States
    const [courseForm, setCourseForm] = useState({ title: '', desc: '', level: 'Beginner', format: 'Video Course', price: '', status: 'Enroll Now' });
    const [jobForm, setJobForm] = useState({ title: '', type: 'Remote', desc: '' });

    const resetForms = () => {
        setEditingId(null);
        setCourseForm({ title: '', desc: '', level: 'Beginner', format: 'Video Course', price: '', status: 'Enroll Now' });
        setJobForm({ title: '', type: 'Remote', desc: '' });
    };

    const handleEditCourse = (course) => {
        setEditingId(course.id);
        setCourseForm(course);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditJob = (job) => {
        setEditingId(job.id);
        setJobForm(job);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmitCourse = (e) => {
        e.preventDefault();
        if (editingId) {
            updateCourse(courseForm);
        } else {
            addCourse(courseForm);
        }
        resetForms();
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();
        if (editingId) {
            updateJob(jobForm);
        } else {
            addJob({ ...jobForm, role: jobForm.title });
        }
        resetForms();
    };

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | PyrusMedia</title>
            </Helmet>
            <div className="min-h-screen bg-black pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400">
                            <LogOut size={20} /> Logout
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-gray-800 pb-4">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'courses' ? 'bg-[#bebd19] text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            Manage Courses
                        </button>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'jobs' ? 'bg-[#bebd19] text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            Manage Jobs
                        </button>
                    </div>

                    {activeTab === 'courses' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* List */}
                            <div className="lg:col-span-2 space-y-4">
                                <h2 className="text-2xl font-bold text-white mb-4">Existing Courses</h2>
                                {courses.map(course => (
                                    <div key={course.id} className="bg-[#111] p-6 rounded-xl border border-gray-800 flex justify-between items-center group">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#bebd19] transition-colors">{course.title}</h3>
                                            <p className="text-sm text-gray-500">{course.level} • {course.price}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditCourse(course)} className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => deleteCourse(course.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {courses.length === 0 && <p className="text-gray-500">No courses added yet.</p>}
                            </div>

                            {/* Add/Edit Form */}
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 h-fit sticky top-24">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                                        {editingId ? 'Edit Course' : 'Add New Course'}
                                    </span>
                                    {editingId && (
                                        <button onClick={resetForms} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
                                            <X size={14} /> Cancel
                                        </button>
                                    )}
                                </h2>
                                <form onSubmit={handleSubmitCourse} className="space-y-3">
                                    <input required placeholder="Course Title" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    <textarea required placeholder="Description" value={courseForm.desc} onChange={e => setCourseForm({ ...courseForm, desc: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input required placeholder="Level (e.g. Beginner)" value={courseForm.level} onChange={e => setCourseForm({ ...courseForm, level: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                        <input required placeholder="Price (e.g. $49)" value={courseForm.price} onChange={e => setCourseForm({ ...courseForm, price: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    </div>
                                    <select value={courseForm.status} onChange={e => setCourseForm({ ...courseForm, status: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none">
                                        <option value="Enroll Now">Enroll Now</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="Waitlist">Waitlist</option>
                                    </select>
                                    <Button type="submit" className={`w-full justify-center mt-2 ${editingId ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                                        {editingId ? 'Update Course' : 'Add Course'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* List */}
                            <div className="lg:col-span-2 space-y-4">
                                <h2 className="text-2xl font-bold text-white mb-4">Open Positions</h2>
                                {jobs.map(job => (
                                    <div key={job.id} className="bg-[#111] p-6 rounded-xl border border-gray-800 flex justify-between items-center group">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#bebd19] transition-colors">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.type}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditJob(job)} className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {jobs.length === 0 && <p className="text-gray-500">No active job openings.</p>}
                            </div>

                            {/* Add/Edit Form */}
                            <div className="bg-[#111] p-6 rounded-xl border border-gray-800 h-fit sticky top-24">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                                        {editingId ? 'Edit Job' : 'Add New Job'}
                                    </span>
                                    {editingId && (
                                        <button onClick={resetForms} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
                                            <X size={14} /> Cancel
                                        </button>
                                    )}
                                </h2>
                                <form onSubmit={handleSubmitJob} className="space-y-3">
                                    <input required placeholder="Job Title" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    <input required placeholder="Type (e.g. Remote / Full-time)" value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    <textarea required rows="3" placeholder="Short Description" value={jobForm.desc} onChange={e => setJobForm({ ...jobForm, desc: e.target.value })} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    <Button type="submit" className={`w-full justify-center mt-2 ${editingId ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                                        {editingId ? 'Update Job' : 'Add Job'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
