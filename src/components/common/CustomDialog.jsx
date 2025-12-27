import React from 'react';
import { CheckCircle, AlertCircle, X, HelpCircle } from 'lucide-react';
import Button from './Button';

const CustomDialog = ({ isOpen, title, message, type = 'success', onClose, onConfirm, confirmText = 'Confirm' }) => {
    if (!isOpen) return null;

    let Icon = CheckCircle;
    let iconColor = 'text-green-500';
    let iconBg = 'bg-green-500/10';

    if (type === 'error') {
        Icon = AlertCircle;
        iconColor = 'text-red-500';
        iconBg = 'bg-red-500/10';
    } else if (type === 'confirm') {
        Icon = HelpCircle;
        iconColor = 'text-yellow-500';
        iconBg = 'bg-yellow-500/10';
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}>
                        <Icon size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 mb-6">{message}</p>

                    {type === 'confirm' ? (
                        <div className="flex gap-3 w-full">
                            <Button
                                onClick={onClose}
                                className="w-full justify-center bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className="w-full justify-center bg-red-600 hover:bg-red-700 text-white"
                            >
                                {confirmText}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={onClose}
                            className={`w-full justify-center ${type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            {type === 'success' ? 'Continue' : 'Close'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
