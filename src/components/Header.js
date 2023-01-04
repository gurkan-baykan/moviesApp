import React from 'react';
import '../style/header.css';
const Header = () => {
  return (
    <div className="topnav">
      <a className="active" href="#home">
        Anasayfa
      </a>
      <a href="#news">Listeler</a>
      <a href="#contact">Seriler</a>
      <a href="#about">Türler</a>
    </div>
  );
};
export default Header;
