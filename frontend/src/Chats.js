import React from 'react';
import './Chats.css'
import Chat from './Chat';

function Chats() {
    return (
        <div className='chats'>
            <Chat
                name='Snoopy'
                message='hey'
                timestamp='40 seconds ago'
                profilePic='https://wl-brightside.cf.tsp.li/resize/728x/webp/6bf/530/5f80875d918368add675a43eff.jpg.webp'
            />
            <Chat
                name='Cold Snoopy'
                message='heyyyyy'
                timestamp='1 minute ago'
                profilePic='https://i.pinimg.com/originals/1d/e4/ef/1de4efd3857649e6303c42f54af7edd9.jpg'
            />
        </div>
    );
}

export default Chats;