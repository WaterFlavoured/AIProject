import React from 'react'
import './TextArea.css'
import TextBubble from './TextBubble'
const TextArea = () => {
    const text1 = [
        {
            id: 1,
            who: 'DrYangGPT',
            text: 'Hi! I\'m YangGPT, a text-based AI model trained on the GPT-3 architecture. I can generate text based on the prompts you give me. Try typing something in the text box below and see what I come up with!'
        },
        {
            id: 2,
            who: 'User',
            text: 'I am a text-based AI model trained on the GPT-3 architecture. I can generate text based on the prompts you give me. Try typing something in the text box below and see what I come up with!'
        },
        {
            id: 3,
            who: 'DrYangGPT',
            text: 'Sure, I can help you with that. What do you need assistance with?'
        },
        {
            id: 4,
            who: 'User',
            text: 'Can you explain how the GPT-3 model works?'
        },
        {
            id: 5,
            who: 'DrYangGPT',
            text: 'GPT-3 is a language model that uses machine learning to generate human-like text based on the input it receives.'
        },
        {
            id: 6,
            who: 'User',
            text: 'That sounds interesting. How does it learn?'
        },
        {
            id: 7,
            who: 'DrYangGPT',
            text: 'It learns by being trained on a large dataset of text from the internet, which allows it to understand and generate text in a coherent manner.'
        },
        {
            id: 8,
            who: 'User',
            text: 'Can it understand any language?'
        },
        {
            id: 9,
            who: 'DrYangGPT',
            text: 'GPT-3 is primarily trained on English text, but it can understand and generate text in other languages to some extent.'
        },
        {
            id: 10,
            who: 'User',
            text: 'What are some applications of GPT-3?'
        },
        {
            id: 11,
            who: 'DrYangGPT',
            text: 'GPT-3 can be used for a variety of applications, including chatbots, content generation, translation, and more.'
        },
        {
            id: 12,
            who: 'User',
            text: 'Thank you for the information!'
        }
    ]
    return (
        <div className='textArea'>
            {text1.map((text) => (
                <div key={text.id} className={text.who === 'DrYangGPT' ? 'textBubbleLeft' : 'textBubbleRight'}>
                    <TextBubble text={text.text} who={text.who} />
                </div>
            ))}
        </div>
    )
}

export default TextArea