import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';

function Header() {
  return (
    // BEM
    <div className='header'>
        <IconButton>
            <PersonIcon className='header_icon' fontSize='large'/>
        </IconButton>
        <img className='header_logo'
            src='https://download.logo.wine/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.png'
            alt='Tinder Logo'/>
        <IconButton>
            <ForumIcon className='header_icon' fontSize='large'/>
        </IconButton>
    </div>
  );
}

export default Header;
