import PropTypes from 'prop-types';

import LabelAndInput from '../../components/Form/LabelAndInput';

const Payment = ({
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  errors,
  value,
  handleChange,
}) => {
  return (
    <div className="mb-2 flex flex-col items-center rounded-[5px] bg-lightBlue p-10">
      <h2 className="mb-5 font-headings text-2xl font-bold">
        Payment Information
      </h2>

      <LabelAndInput
        id="cardholderName"
        name="cardholderName"
        type="text"
        value={value}
        onChange={handleChange}
        error={errors.cardholderName}
      >
        Name on Card
      </LabelAndInput>

      <div className="mb-3 flex w-full flex-col gap-1">
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElement
          id="cardNumber"
          className="w-full rounded border border-gray bg-white p-2"
        />
        {errors.cardNumber && <p className="text-red">{errors.cardNumber}</p>}
      </div>

      <div className="flex w-full gap-4">
        <div className="mb-3 flex w-full flex-col gap-1">
          <label htmlFor="cardExpiry">Expiration Date</label>
          <CardExpiryElement
            id="cardExpiry"
            className="w-full rounded border border-gray bg-white p-2"
          />
          {errors.cardExpiry && <p className="text-red">{errors.cardExpiry}</p>}
        </div>

        <div className="mb-3 flex w-full flex-col gap-1">
          <label htmlFor="cardCvc">CVC</label>
          <CardCvcElement
            id="cardCvc"
            className="w-full rounded border border-gray bg-white p-2"
          />
          {errors.cardCvc && <p className="text-red">{errors.cardCvc}</p>}
        </div>

        <p className="text-red">{errors.payment}</p>
      </div>
    </div>
  );
};

Payment.propTypes = {
  CardNumberElement: PropTypes.elementType.isRequired,
  CardCvcElement: PropTypes.elementType.isRequired,
  CardExpiryElement: PropTypes.elementType.isRequired,
  errors: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Payment;
