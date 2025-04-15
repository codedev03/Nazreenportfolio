import React from 'react';

const Star = ({ x, y }) => {
    const size = Math.random() * 20 + 10; // Random size between 10 and 30
    const animationDuration = Math.random() * 2 + 1; // Random duration between 1s and 3s

    return (
        <div
            className="star"
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'red', // Change to red for visibility
                borderRadius: '50%',
                animation: `twinkle ${animationDuration}s infinite`,
            }}
        />
    );
};

const Stars = ({ stars }) => {
    return (
        <>
            {stars.map((star, index) => (
                <Star key={index} x={star.x} y={star.y} />
            ))}
        </>
    );
};

export default Stars;