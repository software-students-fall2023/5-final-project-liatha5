import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Profile.js';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.API_URL}/list-profiles`);
                setPeople(res.data);
                console.log(res.data);
                console.log(`url(data:image/png;base64, ${people[0].image_data})`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    if (!people) {
        return <div>Loading matches...</div>
    }

    return (
        <div>
            <div className='tinderCards_cardContainer'>
                {people.map((person, index) => (
                    <TinderCard
                        className='swipe'
                        key={person.name}
                        preventSwipe={['up', 'down']}>
                        <div
                            style={{ backgroundImage: `url(data:image/png;base64,${person.image_data.$binary.base64})` }}
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