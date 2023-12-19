import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import './ChatScreen.css';

function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Snoopy',
            image: 'https://wl-brightside.cf.tsp.li/resize/728x/webp/6bf/530/5f80875d918368add675a43eff.jpg.webp',
            message: 'hey'
        },
        {
            name: 'Snoopy',
            image: 'https://wl-brightside.cf.tsp.li/resize/728x/webp/6bf/530/5f80875d918368add675a43eff.jpg.webp',
            message: 'hows it going'
        },
        {
            message: 'hi'
        }
    ]);
    const handleSend = e => {
        e.preventDefault();

        setMessages([...messages, { message: input}]);
        setInput('');
    };

    return (
        <div className='chatScreen'>
            <p className='chatScreen_timestamp'>YOU MATCHED WITH SNOOPY ON 12/10/23</p>
            {messages.map((message) => (
                message.name ? (
                    <div className='chatScreen_message'>
                        <Avatar
                            className='chatScreen_image'
                            alt={message.name}
                            src={message.image}
                        />
                        <p className='chatScreen_text'>{message.message}</p>
                    </div>
                ) : (
                    <div className='chatScreen_message'>
                        <p className='chatScreen_textUser'>{message.message}</p>
                    </div>
                )
            ))}
            <form className='chatScreen_input'>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='chatScreen_inputField'
                    type='text'
                    placeholder='Type a message...'/>
                <button
                    onClick={handleSend}
                    type='submit'
                    className='chatScreen_inputButton'>SEND</button>
            </form>
        </div>
    );
}

export default ChatScreen;