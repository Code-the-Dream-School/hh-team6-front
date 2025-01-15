import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <nav aria-label="Breadcrumb" className="ml-4 mt-2">
      <ol className="inline-flex items-center space-x-2">
        <li>
          <div className="flex items-center">
            <Link to="/cart" className="ms-2 text-gray hover:text-blue-600">
              Cart
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="mx-1 h-3 w-3 text-gray rtl:rotate-180"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" d="m1 9 4-4-4-4" />
            </svg>
            <span className="ms-2 text-black">Checkout</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
