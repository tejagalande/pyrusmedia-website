import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
    children,
    to,
    onClick,
    variant = 'primary', // primary, outline
    className = '',
    ...props
}) => {
    const baseClasses = 'btn';
    const variantClasses = variant === 'outline' ? 'btn-outline' : 'btn-primary';
    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={combinedClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
