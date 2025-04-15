import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text[index];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % text.length);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index, text, speed]);

  return (
    <span style={{ borderBottom: '2px solid #00ffff', display: 'inline-block' }}>
      {displayedText}
    </span>
  );
};

export default Typewriter;