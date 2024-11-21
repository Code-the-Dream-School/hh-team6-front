import React from 'react';
import footerImage from '../assets/images/footer.jpg'; //

const Footer = () => {
  return (
      <footer style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
              src={footerImage} 
              alt="Footer" 
              style={{ width: '100%', height: 'auto' }} 
          />
      </footer>
  );
};

export default Footer;