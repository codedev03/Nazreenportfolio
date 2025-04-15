import React, { useEffect, useState } from 'react';
import Stars from './Stars';

const MagicWandCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stars, setStars] = useState([]);

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
        console.log('Magic wand clicked at:', position);
        setStars((prevStars) => {
            const newStars = [...prevStars, { x: position.x, y: position.y }];
            console.log('Updated stars:', newStars); // Log the updated stars
            return newStars;
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [position]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    pointerEvents: 'none',
                }}
            >
                <img src="assets\images\magic-wand1.svg" alt="Magic Wand" />
            </div>
            <Stars stars={stars} />
        </>
    );
};

export default MagicWandCursor;