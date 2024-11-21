import React from 'react';
import footerImage from '../assets/images/footer.jpg'; //

const Footer = () => {
    return (
        <footer className="footer">
            <img 
                src={footerImage} 
                alt="Footer" 
            />
        </footer>
    );
};

export default Footer;

