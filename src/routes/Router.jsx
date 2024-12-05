import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

// Pages
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Account pages
import Account from '../pages/account/Account';

// Books pages
import Book from '../pages/books/Book';
import Books from '../pages/books/Books';

// Cart pages
import Cart from '../pages/cart/Cart';
import CheckOut from '../pages/cart/CheckOut';

// Auth pages
import PasswordEdit from '../pages/auth/PasswordEdit';
import PasswordReset from '../pages/auth/PasswordReset';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import UpdateProfile from '../pages/account/UpdateProfile';

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Account Route */}
      <Route
        path="/account"
        element={<ProtectedRoute element={<Account />} />}
      />

      {/* UpdateProfile Route */}
      <Route path="/update_profile" element={<UpdateProfile />} />

      {/* Books Routes */}
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<Book />} />

      {/* Cart Routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/check_out" element={<CheckOut />} />

      {/* Auth Routes */}
      <Route path="/password/reset" element={<PasswordReset />} />
      <Route path="/password/edit" element={<PasswordEdit />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
