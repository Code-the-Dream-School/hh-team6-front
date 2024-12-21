import PropTypes from 'prop-types';

import LabelAndSelect from '../../components/Form/LabelAndSelect';
import { sortingOptions } from '../../utils/selectUtils';
import Filters from '../Filters';

const LeftMenu = ({ sortBy, handleSortSelect, filters, setFilters }) => {
  return (
    <aside className="mx-5 hidden w-[230px] sm:block">
      <div className="mb-6">
        <LabelAndSelect
          id="sortBy"
          name="sortBy"
          value={sortBy}
          data={sortingOptions}
          onChange={handleSortSelect}
        >
          Sort:
        </LabelAndSelect>
      </div>

      <Filters filters={filters} setFilters={setFilters} />
    </aside>
  );
};

LeftMenu.propTypes = {
  sortBy: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  handleSortSelect: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default LeftMenu;
