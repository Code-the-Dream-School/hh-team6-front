import { useCallback } from 'react';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import PropTypes from 'prop-types';

import downIcon from '../../assets/images/downIcon.svg';

const MAX_VISIBLE_ITEMS = 2;

const buttonLabel = (currentValue, multiple = false) => {
  if (!multiple) {
    return currentValue;
  }

  if (Array.isArray(currentValue) && currentValue.length > 0) {
    if (currentValue.length > MAX_VISIBLE_ITEMS) {
      return `${currentValue.slice(0, MAX_VISIBLE_ITEMS).join(', ')} and ${currentValue.length - MAX_VISIBLE_ITEMS} more...`;
    }
    return currentValue.join(', ');
  }

  return currentValue;
};

const LabelAndSelect = ({
  id,
  name,
  value,
  data,
  multiple = false,
  onChange,
  children,
  error,
}) => {
  const currentValue = value || data.default;

  const handleChange = useCallback(
    (val) => {
      onChange(name, val);
    },
    [name, onChange]
  );

  return (
    <div className="mb-3 flex flex-col gap-1">
      <label htmlFor={id}>{children}</label>
      <Listbox
        value={currentValue}
        onChange={handleChange}
        {...(multiple && { multiple: true })}
      >
        <ListboxButton
          id={id}
          className="flex h-[42px] w-full items-center justify-between rounded border border-gray p-2"
        >
          <div>{buttonLabel(currentValue, multiple)}</div>
          <img src={downIcon} alt="Option icon" className="h-4 w-4" />
        </ListboxButton>
        <ListboxOptions className="mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray bg-white">
          {data.options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className={({ active, selected }) =>
                `cursor-pointer p-2 ${
                  multiple && active ? 'bg-darkGreenHover text-white' : ''
                } ${multiple && selected ? 'bg-darkGreen text-white' : ''}`
              }
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      {error && <p className="text-red">{error}</p>}
    </div>
  );
};

LabelAndSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  error: PropTypes.string,
};

export default LabelAndSelect;
