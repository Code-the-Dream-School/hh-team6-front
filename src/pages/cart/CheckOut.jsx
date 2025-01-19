import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckOutForm from './CheckoutForm';

const CheckOut = () => {
  const stripePromise = loadStripe(
    'pk_test_51QhbZJ2Kxgm5k1498q8xe0MZQ4D2VrSU87nAkKMvmaNBsRISBNjLe9xcmV4QRc2oG8Og73I5svggVUGfUQI63FNp00GjWkyXmg'
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
};

export default CheckOut;
