import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.js';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/list-profiles`);
                setPeople(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onSwipe = (direction, person) => {
        setPeople(prevPeople => prevPeople.filter(p => p.name !== person.name));
        people.pop();
        console.log(people);
        if (people.length == 1) {
            regenerateProfiles();
            console.log('regenerated');
        }
    };

    const regenerateProfiles = async () => {
        try {
            const storedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
            const queryParams = new URLSearchParams(storedPreferences).toString();
            await axios.get(`http://127.0.0.1:5000/generate-ten-profiles?${queryParams}`);
            const res = await axios.get(`http://127.0.0.1:5000/list-profiles?${queryParams}`);
            setPeople(res.data);
            console.log('Regenerated profiles:', res.data);
        } catch (error) {
            console.error('Error regenerating profiles:', error);
        }
    };


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
                        onSwipe={(direction) => onSwipe(direction, person)}
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