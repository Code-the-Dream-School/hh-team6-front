import { useLocation } from 'react-router-dom';

import Breadcrumb from './Breadcrumb';
import CartSummary from './CartSummary';
import LabelAndInput from '../../components/Form/LabelAndInput';
import useCheckoutForm from '../../hooks/useCheckoutForm';
import Preloader from '../../layouts/Preloader';

const CheckOut = () => {
  const { form, error, isLoading, handleChange, handleSubmit } =
    useCheckoutForm();

  const location = useLocation();

  return (
    <div className="flex flex-grow flex-col">
      <Breadcrumb />
      <div className="flex-2 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 font-headings text-2xl font-bold">Checkout</h1>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-col items-center rounded-[5px] bg-lightBlue p-10">
            <h2 className="mb-5 font-headings text-2xl font-bold">
              Your Address
            </h2>

            {isLoading && <Preloader />}

            <form onSubmit={handleSubmit} className="flex w-full flex-col">
              <div className="flex gap-4">
                <LabelAndInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  error={error.firstName}
                  onChange={handleChange}
                >
                  First Name
                </LabelAndInput>

                <LabelAndInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  error={error.lastName}
                  onChange={handleChange}
                >
                  Last Name
                </LabelAndInput>
              </div>
              <LabelAndInput
                id="email"
                name="email"
                type="email"
                value={form.email}
                error={error.email}
                onChange={handleChange}
              >
                Email
              </LabelAndInput>
              <LabelAndInput
                id="country"
                name="country"
                type="text"
                value={form.country}
                error={error.country}
                onChange={handleChange}
              >
                Country
              </LabelAndInput>
              <div className="flex gap-4">
                <LabelAndInput
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  error={error.city}
                  onChange={handleChange}
                >
                  City
                </LabelAndInput>

                <LabelAndInput
                  id="zip"
                  name="zip"
                  type="text"
                  value={form.zip}
                  error={error.zip}
                  onChange={handleChange}
                >
                  Zip Code
                </LabelAndInput>
              </div>
              <LabelAndInput
                id="address"
                name="address"
                type="text"
                value={form.address}
                error={error.address}
                onChange={handleChange}
              >
                Address
              </LabelAndInput>
            </form>
          </div>
          <CartSummary totals={location.state} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
