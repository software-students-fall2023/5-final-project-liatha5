import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

function Header({ backButton }) {
    const navigate = useNavigate();
    return (
        <div className='header'>
            {backButton ? (
                <IconButton onClick={() => navigate(backButton)}>
                    <ArrowBackIosIcon fontSize='large' className='header_icon'/>
                </IconButton>
            ): (
                <IconButton>
                    <PersonIcon className='header_icon' fontSize='large'/>
                </IconButton>
            )}

            <Link to='/'>
            <img className='header_logo'
                src='https://download.logo.wine/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.png'
                alt='Tinder Logo'/>
            </Link>
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon className='header_icon' fontSize='large'/>
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;
