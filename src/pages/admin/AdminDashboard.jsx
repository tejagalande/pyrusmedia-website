import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DataContext } from '../../context/DataProvider';
import Section from '../../components/common/Section';
import Button from '../../components/common/Button';
import { Plus, Trash2, LogOut, Edit2, X, Upload } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../../supabase';
import CustomDialog from '../../components/common/CustomDialog';

const AdminDashboard = () => {
    const { courses, addCourse, deleteCourse, updateCourse, jobs, addJob, deleteJob, updateJob, loading } = useContext(DataContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');
    const [editingId, setEditingId] = useState(null);

    // Auth Check
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin');
        }
    }, [navigate]);

    // Handle Back Button & Logout Logic
    useEffect(() => {
        // Push a state to trap the back button
        window.history.pushState(null, null, window.location.pathname);

        const handlePopState = (event) => {
            // Prevent default back behavior initially
            const confirmLogout = window.confirm("Do you want to logout from admin panel?");

            if (confirmLogout) {
                localStorage.removeItem('isAdmin');
                // Allow the back navigation to proceed (which effectively goes back from the pushed state)
                // But since we are logged out, we want to go back to the page BEFORE admin dashboard
                navigate(-1); // Go back twice: once for the pushed state, once to exit dashboard
            } else {
                // Push state again to re-trap
                window.history.pushState(null, null, window.location.pathname);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('isAdmin');
            navigate('/admin');
        }
    };

    // Form States
    const [courseForm, setCourseForm] = useState({ title: '', desc: '', level: 'Beginner', format: 'Video Course', price: '', status: 'Enroll Now', thumbnail_url: '' });

    // Debug render
    console.log('Current Form State:', courseForm);

    const [jobForm, setJobForm] = useState({ title: '', type: 'Remote', desc: '' });
    const [uploading, setUploading] = useState(false);

    // Custom Dialog State
    const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', type: 'success' });

    const resetForms = () => {
        setEditingId(null);
        setCourseForm({ title: '', desc: '', level: 'Beginner', format: 'Video Course', price: '', status: 'Enroll Now', thumbnail_url: '' });
        setJobForm({ title: '', type: 'Remote', desc: '' });
    };

    const [pendingDelete, setPendingDelete] = useState({ type: '', id: null });

    const closeDialog = () => {
        setDialog({ ...dialog, isOpen: false });
        setPendingDelete({ type: '', id: null });
    };

    const handleConfirmAction = async () => {
        if (!pendingDelete.id) return;

        closeDialog(); // Close confirmation dialog

        let result;
        if (pendingDelete.type === 'course') {
            result = await deleteCourse(pendingDelete.id);
            if (result.success) {
                setDialog({ isOpen: true, title: 'Course Deleted', message: 'The course has been successfully removed.', type: 'success' });
            }
        } else if (pendingDelete.type === 'job') {
            result = await deleteJob(pendingDelete.id);
            if (result.success) {
                setDialog({ isOpen: true, title: 'Job Deleted', message: 'The job position has been successfully removed.', type: 'success' });
            }
        }

        if (result && !result.success) {
            setDialog({ isOpen: true, title: 'Error', message: result.message, type: 'error' });
        }
    };

    const handleEditCourse = (course) => {
        console.log('Editing course - Incoming Data:', course);
        setEditingId(course.id);
        const newFormState = {
            id: course.id,
            title: course.title || '',
            desc: course.desc || '',
            level: course.level || 'Beginner',
            format: course.format || 'Video Course',
            price: course.price || '',
            status: course.status || 'Enroll Now',
            thumbnail_url: course.thumbnail_url || ''
        };
        // Use functional update to ensure we don't depend on stale closures, 
        // essentially replacing user action with this state.
        setCourseForm(newFormState);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditJob = (job) => {
        setEditingId(job.id);
        setJobForm(job);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('course-assets')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('course-assets')
                .getPublicUrl(filePath);

            setCourseForm(prev => ({ ...prev, thumbnail_url: data.publicUrl }));
        } catch (error) {
            setDialog({ isOpen: true, title: 'Upload Failed', message: error.message, type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        let result;
        if (editingId) {
            result = await updateCourse(courseForm);
            if (result.success) {
                setDialog({ isOpen: true, title: 'Course Updated', message: 'The course has been successfully updated.', type: 'success' });
            }
        } else {
            result = await addCourse(courseForm);
            if (result.success) {
                setDialog({ isOpen: true, title: 'Course Added', message: 'New course has been successfully added.', type: 'success' });
            }
        }

        if (!result.success) {
            setDialog({ isOpen: true, title: 'Error', message: result.message, type: 'error' });
        } else {
            resetForms();
        }
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        let result;
        if (editingId) {
            result = await updateJob(jobForm);
            if (result.success) {
                setDialog({ isOpen: true, title: 'Job Updated', message: 'The job position has been successfully updated.', type: 'success' });
            }
        } else {
            result = await addJob({ ...jobForm, role: jobForm.title });
            if (result.success) {
                setDialog({ isOpen: true, title: 'Job Added', message: 'New job position has been successfully added.', type: 'success' });
            }
        }

        if (!result.success) {
            setDialog({ isOpen: true, title: 'Error', message: result.message, type: 'error' });
        } else {
            resetForms();
        }
    };

    const handleDeleteCourse = (id) => {
        setPendingDelete({ type: 'course', id });
        setDialog({
            isOpen: true,
            title: 'Delete Course',
            message: 'Are you sure you want to delete this course? This action cannot be undone.',
            type: 'confirm'
        });
    };

    const handleDeleteJob = (id) => {
        setPendingDelete({ type: 'job', id });
        setDialog({
            isOpen: true,
            title: 'Delete Job',
            message: 'Are you sure you want to delete this job position? This action cannot be undone.',
            type: 'confirm'
        });
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
                                {loading ? (
                                    <div className="text-gray-400 py-10 text-center">Loading courses...</div>
                                ) : courses.length > 0 ? (
                                    courses.map(course => (
                                        <div key={course.id} className="bg-[#111] p-6 rounded-xl border border-gray-800 flex justify-between items-center group">
                                            <div className="flex items-center gap-4">
                                                {course.thumbnail_url && (
                                                    <img src={course.thumbnail_url} alt={course.title} className="w-16 h-16 object-cover rounded-md" />
                                                )}
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-[#bebd19] transition-colors">{course.title}</h3>
                                                    <p className="text-sm text-gray-500">{course.level} • {course.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditCourse(course)} className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-[#111] rounded-xl border border-gray-800 border-dashed">
                                        <p className="text-gray-500">No courses added yet.</p>
                                    </div>
                                )}
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
                                    <input required placeholder="Course Title" value={courseForm.title} onChange={e => setCourseForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />

                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <label className="block text-gray-400 text-sm">Thumbnail Image</label>
                                        <div className="flex gap-2 items-center">
                                            <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded flex items-center gap-2 text-sm transition-colors">
                                                <Upload size={16} />
                                                {uploading ? 'Uploading...' : 'Choose Image'}
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                                            </label>
                                            {courseForm.thumbnail_url && (
                                                <img src={courseForm.thumbnail_url} alt="Preview" className="h-10 w-10 object-cover rounded border border-gray-700" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white text-black rounded">
                                        <ReactQuill
                                            theme="snow"
                                            value={courseForm.desc}
                                            onChange={value => setCourseForm(prev => ({ ...prev, desc: value }))}
                                            placeholder="Description"
                                            className="bg-white text-black rounded"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input required placeholder="Level (e.g. Beginner)" value={courseForm.level} onChange={e => setCourseForm(prev => ({ ...prev, level: e.target.value }))} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                        <input required placeholder="Price (e.g. $49)" value={courseForm.price} onChange={e => setCourseForm(prev => ({ ...prev, price: e.target.value }))} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none" />
                                    </div>
                                    <select value={courseForm.status} onChange={e => setCourseForm(prev => ({ ...prev, status: e.target.value }))} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-[#bebd19] outline-none">
                                        <option value="Enroll Now">Enroll Now</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="Waitlist">Waitlist</option>
                                    </select>
                                    <Button type="submit" disabled={uploading} className={`w-full justify-center mt-2 ${editingId ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                                        {uploading ? 'Please wait...' : (editingId ? 'Update Course' : 'Add Course')}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* List */}
                            <div className="lg:col-span-2 space-y-4">
                                <h2 className="text-2xl font-bold text-white mb-4">Open Positions</h2>
                                {loading ? (
                                    <div className="text-gray-400 py-10 text-center">Loading jobs...</div>
                                ) : jobs.length > 0 ? (
                                    jobs.map(job => (
                                        <div key={job.id} className="bg-[#111] p-6 rounded-xl border border-gray-800 flex justify-between items-center group">
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#bebd19] transition-colors">{job.title}</h3>
                                                <p className="text-sm text-gray-500">{job.type}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditJob(job)} className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-[#111] rounded-xl border border-gray-800 border-dashed">
                                        <p className="text-gray-500">No active job openings.</p>
                                    </div>
                                )}
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
            <CustomDialog
                isOpen={dialog.isOpen}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                onClose={closeDialog}
                onConfirm={handleConfirmAction}
                confirmText="Delete"
            />
        </>
    );
};

export default AdminDashboard;
