import React, { useState } from 'react';
import { X, Lock, CheckCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../../supabase';
import CustomDialog from './CustomDialog';

const EnrollmentModal = ({ isOpen, onClose, course }) => {
    const [step, setStep] = useState(1); // 1: Form, 2: Processing, 3: Success
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', type: 'success' });

    if (!isOpen || !course) return null;

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Load Razorpay SDK
            const res = await loadRazorpay();
            if (!res) {
                throw new Error('Razorpay SDK failed to load. Are you online?');
            }

            // 2. Create Order via Edge Function
            // Note: We're invoking the function we just created.
            // Ensure you have deployed it using `supabase functions deploy create-razorpay-order`
            const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
                body: {
                    courseId: course.id,
                    amount: parseFloat(course.price.replace(/[^0-9.]/g, '')) // Extract number from "$49" or "499 INR"
                }
            });

            if (orderError) throw orderError;
            if (!orderData) throw new Error('No order data received');

            // 3. Initialize Razorpay Payment
            const options = {
                key: orderData.key_id, // Enter the Key ID generated from the Dashboard
                amount: orderData.amount,
                currency: orderData.currency,
                name: "PyrusMedia",
                description: `Enrollment: ${course.title}`,
                image: "https://example.com/your_logo", // You can update this later
                order_id: orderData.order_id,
                handler: async function (response) {
                    // 4. Payment Success - Record Enrollment in DB
                    try {
                        const { error: dbError } = await supabase
                            .from('enrollments')
                            .insert([
                                {
                                    course_id: course.id,
                                    student_name: formData.name,
                                    student_email: formData.email,
                                    student_phone: formData.phone,
                                    amount: orderData.amount / 100,
                                    currency: orderData.currency,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    status: 'paid'
                                }
                            ]);

                        if (dbError) throw dbError;

                        setStep(3); // Show Success
                        setDialog({
                            isOpen: true,
                            title: 'Enrollment Successful!',
                            message: 'Welcome aboard! We have received your payment and registration.',
                            type: 'success'
                        });

                    } catch (err) {
                        console.error('Database Error:', err);
                        setError('Payment successful but failed to record enrollment. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#bebd19"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setFormData({ name: '', email: '', phone: '' });
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                    <X size={20} />
                </button>

                <div className="p-8">
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">Enroll in {course.title}</h2>
                            <p className="text-gray-400 mb-6">Enter your details to proceed to payment.</p>

                            {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#bebd19] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#bebd19] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#bebd19] outline-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between items-center mb-4 p-4 bg-gray-900 rounded-lg">
                                        <span className="text-gray-300">Total Amount</span>
                                        <span className="text-xl font-bold text-[#bebd19]">{course.price}</span>
                                    </div>

                                    <Button type="submit" disabled={loading} className="w-full justify-center py-4 text-base">
                                        {loading ? 'Processing...' : 'Proceed to Payment'} <Lock size={16} className="ml-2" />
                                    </Button>
                                    <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                                        <Lock size={12} /> Secure payment via Razorpay
                                    </p>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 3 && (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Enrollment Successful!</h2>
                            <p className="text-gray-400 mb-8">Thank you, {formData.name}. We have sent a confirmation email to {formData.email}.</p>
                            <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700 w-full justify-center">
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <CustomDialog
                isOpen={dialog.isOpen}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                onClose={() => setDialog({ ...dialog, isOpen: false })}
            />
        </div>
    );
};

export default EnrollmentModal;
