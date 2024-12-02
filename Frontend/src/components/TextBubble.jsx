import React from 'react'
import './TextBubble.css'
const TextBubble = ({text, who}) => {
  return (
    <div>
        {/* Rendering text bubble depending on sender */}
        {who === 'DrYangGPT' ? (
            // Rendering DrYangGPT text bubble
            <div className='textBubbleYang'>
                <div className='text'>
                    <p>{text}</p> {/* Displaying text */}
                </div>
            </div>
        ) : 
        (   // Rendering user text bubble
            <div className='textBubbleUser'>
                <div className='text'>
                    <p>{text}</p> {/* Displaying text */}
                </div>
            </div>
        )}
    </div>
  )
}

export default TextBubble