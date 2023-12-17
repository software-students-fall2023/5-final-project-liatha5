import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import './Profile.js';

function Generator() {
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.API_URL}/generate-profile`);
                setUser(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...Generating Profile</div>
    }

    return (
        <div className='generatedProfile'>
            <div className='profileSection'>
                <Avatar
                    className='profileAvatar'
                    alt={user.name}
                    src={`data:image/png;base64,${user.image_data.binary}`}
                    sx={{ width: 100, height: 100 }}
                />
                <h3 label="Name" variant="outlined" name="name">
                    {user.name}
                </h3>
                <div>
                    {user.bio}
                </div>
            </div>
            
            <div className='preferencesSection'>
                <h3>Ideal Partner Preferences</h3>
                <p
                    label="Minimum Age"
                    variant="outlined"
                    name="minAge"
                    type="number"
                    readOnly
                >
                    Minimum Age: {user.preferences.minAge}

                </p>
                <p
                    label="Maximum Age"
                    variant="outlined"
                    name="maxAge"
                    type="number"
                >
                    Maximum Age: {user.preferences.maxAge}
                </p>
                <p
                    label="Interests"
                    variant="outlined"
                    name="interests"
                >
                    Interests: {user.preferences.interests}
                </p>
                <p
                    label="Gender Preference"
                    variant="outlined"
                    name="genderPreference"
                >
                    Gender Preference: {user.preferences.genderPreference}
                </p>
            </div>
        </div>
    )
}


export default Generator;