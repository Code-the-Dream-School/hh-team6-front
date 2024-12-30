import { Input } from '@headlessui/react';
import PropTypes from 'prop-types';

const LabelAndInput = ({
  id,
  name,
  type,
  value,
  min,
  max,
  step,
  onChange,
  children,
  error,
  disabled = false,
  className = '',
}) => (
  <div className="mb-3 flex w-full flex-col gap-1">
    <label htmlFor={id}>{children}</label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded border border-gray p-2 ${className}`}
    />
    {error && <p className="text-red">{error}</p>}
  </div>
);

LabelAndInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default LabelAndInput;
