import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';

function TinderCards() {
    const [people, setPeople] = useState([
        {
            name: 'Snoopy',
            url: 'https://wl-brightside.cf.tsp.li/resize/728x/webp/6bf/530/5f80875d918368add675a43eff.jpg.webp'
        },
        {
            name: 'Cold Snoopy',
            url: 'https://i.pinimg.com/originals/1d/e4/ef/1de4efd3857649e6303c42f54af7edd9.jpg'
        }
    ]);

    return (
        <div>
            <div className='tinderCards_cardContainer'>
                {people.map((person) => (
                    <TinderCard
                        className='swipe'
                        key={person.name}
                        preventSwipe={['up', 'down']}>
                        <div
                            style={{ backgroundImage: `url(${person.url})` }}
                            className='card'>
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards;