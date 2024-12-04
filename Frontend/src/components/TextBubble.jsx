import React from 'react';

const TextBubble = ({ text, className }) => {
  return (
    <div className={className}>
      <div>
        <p>{text}</p> {/* Displaying text */}
      </div>
    </div>
  );
};

export default TextBubble;
