import { useState } from 'react';
import ListComponent from '../../components/buy/ListComponent';
import LocationComponent from '../../components/common/location/LocationComponent';
//import MoveMarkerComponent from '../../components/common/location/MoveLocationComponent';
import SearchComponent from '../../components/common/SearchComponent';
import SelectComponent from '../../components/common/SelectComponent';

const ListPage = () => {
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleSort = (query) => {
    setSort(query);
  };

  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">공동구매</div>
      <div className="m-auto w-2/5 items-center">
        <LocationComponent />
        {/* <MoveMarkerComponent /> */}
      </div>
      <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
        <SearchComponent onSearch={handleSearch} />
        <SelectComponent onSort={handleSort} />
        <ListComponent search={search} sort={sort} />
      </div>
    </>
  );
};

export default ListPage;
