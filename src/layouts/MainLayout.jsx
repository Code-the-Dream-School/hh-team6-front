import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
