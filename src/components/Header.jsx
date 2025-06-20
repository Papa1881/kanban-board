import React, { useState } from 'react';
import UserMenu from './UserMenu';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <h1 className="header-title">Awesome Kanban Board</h1>
      <div className="user-block" onClick={toggleMenu}>
        <img
  src={require('../assets/user-avatar.png')}
  alt="User avatar"
  className="user-avatar"
/>
        <div className={`arrow ${menuOpen ? 'up' : 'down'}`}></div>
        {menuOpen && <UserMenu />}
      </div>
    </header>
  );
}

export default Header;
