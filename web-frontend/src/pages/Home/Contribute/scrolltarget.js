import React from 'react';

const ScrollToTarget = () => {
    const scrollToTarget = () => {
        const targetElement = document.getElementById('introduce');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button className="btn text-white text-xl bg-gray-400 hover:bg-gray-800 w-full sm:w-auto sm:ml-4 rounded-lg mt-0 sm:mt-10" onClick={scrollToTarget}>Tìm hiểu</button>
    );
};

export default ScrollToTarget;