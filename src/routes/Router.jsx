import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';

// Pages
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import About from '../pages/About';

// Account pages
import Account from '../pages/account/Account';

// Books pages
import Books from '../pages/books/Books';
import Book from '../pages/books/Book';

// Cart pages
import Cart from '../pages/cart/Cart';
import CheckOut from '../pages/cart/CheckOut';

// Auth pages
import PasswordReset from '../pages/auth/PasswordReset';
import PasswordEdit from '../pages/auth/PasswordEdit';
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
