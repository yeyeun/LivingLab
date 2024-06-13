import { useState } from 'react';
import ListComponent from '../../components/market/ListComponent';
import SearchComponent from '../../components/common/SearchComponent';
import LocationComponent from '../../components/common/location/LocationComponent';
import SelectComponent from '../../components/common/SelectComponent';

const ListPage = () => {
  const [search, setsearch] = useState('');
  const [sort, setsort] = useState('');

  const handleSearch = (query) => {
    setsearch(query);
  };

  const handleSort = (query) => {
    setsort(query);
  };

  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">동네장터</div>
      <div className="m-auto w-2/5 items-center">
        <LocationComponent />
      </div>
      <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
        <SearchComponent onSearch={handleSearch}/>
        <SelectComponent onSort={handleSort}/>
        <ListComponent search={search} sort={sort} />
      </div>
    </>
  );
};

export default ListPage;
