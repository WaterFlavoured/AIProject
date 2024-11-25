import React from 'react'
import './TextBubble.css'
const TextBubble = ({key, text, who}) => {
  return (
    <div>
        {who === 'DrYangGPT' ? (
            <div className='textBubbleYang'>
                <div className='text'>
                    <p>{text}</p>
                </div>
            </div>
        ) : 
        (
            <div className='textBubbleUser'>
                <div className='text'>
                    <p>{text}</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default TextBubble