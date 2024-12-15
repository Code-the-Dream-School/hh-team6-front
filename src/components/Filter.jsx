import { Checkbox } from '@headlessui/react';
import PropTypes from 'prop-types';

const Filter = ({ name, label, options, selected, setFilter }) => {
  const handleCheckboxChange = (value) => {
    setFilter(
      name,
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="my-4">
      <div className="mb-2">{label}:</div>
      <div className="ml-2">
        {options.map((option) => (
          <div key={option.value} className="flex flex-row items-center gap-1">
            <div>
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="group block size-4 rounded border border-gray data-[checked]:bg-blueGray"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
            </div>
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
