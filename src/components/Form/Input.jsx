import React from 'react';
import PropTypes from 'prop-types';
import { Input as HeadlessInput } from '@headlessui/react';

const Input = ({ id, name, type, value, onChange, children, error }) => (
  <div className="mb-3 flex w-full flex-col gap-1">
    <label htmlFor={id}>{children}</label>
    <HeadlessInput
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={'w-full rounded border-2 border-gray p-2'}
    />
    {error && <p className="text-red">{error}</p>}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
};

export default Input;
