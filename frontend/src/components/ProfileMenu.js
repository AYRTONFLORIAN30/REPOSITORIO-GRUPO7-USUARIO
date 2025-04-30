// src/components/ProfileMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

function ProfileMenu() {
  const navigate = useNavigate();

  return (
    <div className="profile-menu">
      <button onClick={() => navigate('/profile')} className="profile-button">
        Perfil
      </button>
    </div>
  );
}

export default ProfileMenu;
