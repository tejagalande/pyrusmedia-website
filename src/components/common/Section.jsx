import React from 'react';

const Section = ({
    children,
    className = '',
    id = '',
    containerClassName = ''
}) => {
    return (
        <section id={id} className={`section ${className}`}>
            <div className={`container mx-auto px-4 ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
};

export default Section;
