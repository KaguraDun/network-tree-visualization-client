import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="d-flex justify-content-center align-items-center p-2 bg-light">
      <span className="text-dark"> Vasily kovnev {currentYear}</span>
    </footer>
  );
};

export default Footer;
