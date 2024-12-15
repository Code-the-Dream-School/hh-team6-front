import PropTypes from 'prop-types';

import Filter from './Filter';
import {
  ageCategories,
  conditions,
  coverTypes,
  genres,
} from '../utils/selectUtils';

const Filters = ({ filters, setFilters }) => {
  const setFilter = (name, values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: values,
    }));
  };

  return (
    <div className="rounded border border-gray p-3">
      <div className="mb-5 text-center">Filters:</div>
      <Filter
        name="ageCategory"
        label="Age Category"
        options={ageCategories}
        selected={filters.ageCategory}
        setFilter={setFilter}
      />
      <Filter
        name="condition"
        label="Condition"
        options={conditions}
        selected={filters.condition}
        setFilter={setFilter}
      />
      <Filter
        name="coverType"
        label="Binding"
        options={coverTypes}
        selected={filters.coverType}
        setFilter={setFilter}
      />
      <Filter
        name="genre"
        label="Genre"
        options={genres}
        selected={filters.genre}
        setFilter={setFilter}
      />
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
