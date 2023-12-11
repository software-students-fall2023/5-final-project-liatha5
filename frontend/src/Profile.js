import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({
        name: 'Jolly Snoopy',
        imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/snoopy-christmas-edna-a-colwell.jpg',
        preferences: {
            minAge: 0,
            maxAge: 100,
            interests: 'Being cute',
            genderPreference: 'Any'
        },
    });

    const fileInputRef = useRef(null);
    const genderOptions = ['Any', 'Male', 'Female', 'Other'];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setUser({
                ...user,
                imageUrl: URL.createObjectURL(img)
            });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handlePreferenceChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, preferences: { ...user.preferences, [name]: value } });
    };

    const handleSaveChanges = () => {
        console.log('Saved changes:', user);
    };

    return (
        <div className='profilePage'>
            <div className='profileSection'>
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
                <Avatar
                    className='profileAvatar'
                    alt={user.name}
                    src={user.imageUrl}
                    sx={{ width: 100, height: 100 }}
                    onClick={triggerFileInput}
                />
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className='preferencesSection'>
                <h3>Ideal Partner Preferences</h3>
                <TextField
                    label="Minimum Age"
                    variant="outlined"
                    name="minAge"
                    type="number"
                    value={user.preferences.minAge}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    label="Maximum Age"
                    variant="outlined"
                    name="maxAge"
                    type="number"
                    value={user.preferences.maxAge}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    label="Interests"
                    variant="outlined"
                    name="interests"
                    value={user.preferences.interests}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    select
                    label="Gender Preference"
                    variant="outlined"
                    name="genderPreference"
                    value={user.preferences.genderPreference}
                    onChange={handlePreferenceChange}>
                    {genderOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <button type='submit' className="profileSaveButton" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Profile;
