import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        imageUrl: '',
        preferences: {
            minAge: '',
            maxAge: '',
            interests: '',
            genderPreference: '',
        },
    });
    const navigate = useNavigate();
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

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/create-profile', user);
            navigate('/feed');
            console.log('Saved changes:', user);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const getProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get-profile');
            // Update the user state only if the response has data and preferences
            if (response.data && response.data.preferences) {
                setUser(response.data);
            } else {
                console.error('Profile data is incomplete:', response.data);
            }
        } catch (error) {
            console.error('Error getting profile:', error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className='profilePage'>
            {/* Profile Section */}
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
                    value={user.name || ''}
                    onChange={handleInputChange}
                />
            </div>

            {/* Preferences Section */}
            <div className='preferencesSection'>
                <h3>Ideal Partner Preferences</h3>
                <TextField
                    label="Minimum Age"
                    variant="outlined"
                    name="minAge"
                    type="number"
                    value={user.preferences?.minAge || ''}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    label="Maximum Age"
                    variant="outlined"
                    name="maxAge"
                    type="number"
                    value={user.preferences?.maxAge || ''}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    label="Interests"
                    variant="outlined"
                    name="interests"
                    value={user.preferences?.interests || ''}
                    onChange={handlePreferenceChange}
                />
                <TextField
                    select
                    label="Gender Preference"
                    variant="outlined"
                    name="genderPreference"
                    value={user.preferences?.genderPreference || ''}
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
