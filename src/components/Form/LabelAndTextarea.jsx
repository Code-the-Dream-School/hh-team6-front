import { Textarea } from '@headlessui/react';
import PropTypes from 'prop-types';

const DEFAULT_ROWS = 3;

const LabelAndTextarea = ({ id, name, value, onChange, children, error }) => (
  <div className="mb-3 flex w-full flex-col gap-1">
    <label htmlFor={id}>{children}</label>
    <Textarea
      id={id}
      name={name}
      value={value}
      rows={DEFAULT_ROWS}
      onChange={onChange}
      className={'w-full rounded border border-gray p-2'}
    />
    {error && <p className="text-red">{error}</p>}
  </div>
);

LabelAndTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
};

export default LabelAndTextarea;
