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
  const buttonLabel = () => {
    if (multiple) {
      if (Array.isArray(value) && value.length > 0) {
        if (value.length > MAX_VISIBLE_ITEMS) {
          return `${value.slice(0, MAX_VISIBLE_ITEMS).join(', ')} and ${value.length - MAX_VISIBLE_ITEMS} more...`;
        }
        return value.join(', ');
      }
    } else {
      const option = data.find((option) => option.value === value);
      return option ? option.label : '';
    }
  };

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
        value={value}
        onChange={handleChange}
        {...(multiple && { multiple: true })}
      >
        <ListboxButton
          id={id}
          className="flex min-h-[42px] w-full min-w-[160px] items-center justify-between rounded border border-gray p-2"
        >
          <div>{buttonLabel(value, multiple)}</div>
          <img src={downIcon} alt="Option icon" className="h-4 w-4" />
        </ListboxButton>
        <ListboxOptions
          className="max-h-60 w-[var(--button-width)] overflow-y-auto rounded border border-gray bg-white [--anchor-gap:4px]"
          modal={false}
          anchor="bottom end"
        >
          {data.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={({ active, selected }) =>
                `cursor-pointer p-2 ${
                  multiple && active ? 'bg-darkGreenHover text-white' : ''
                } ${multiple && selected ? 'bg-darkGreen text-white' : ''}`
              }
            >
              {option.label}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  error: PropTypes.string,
};

export default LabelAndSelect;
