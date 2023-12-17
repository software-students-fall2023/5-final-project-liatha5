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
            const fetchPromises = [];

            for (let i = 0; i < 10; i++) {
                const apiURL = 'http://127.0.0.1:5000/generate-profile';
                fetchPromises.push(fetch(apiURL).then(res => res.json()));
            }

            try {
                const resDataArray = await Promise.all(fetchPromises);
                setPeople(resDataArray);
                console.log("All requests completed:", resDataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className='tinderCards_cardContainer'>
                {people.map((person, index) => (
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