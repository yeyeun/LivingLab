import ListComponent from '../../components/shareRoom/ListComponent';
import LocationComponent from '../../components/common/location/LocationComponent';
import { useState } from 'react';
import SearchComponent from '../../components/common/SearchComponent';
import SelectComponent2 from '../../components/common/SelectComponentForRoom';

const ListPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  // ?search={}으로 받은 값으로 검색
  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleSort = (query) => {
    setSort(query);
  };

  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">자취방쉐어</div>
      <div className="m-auto w-2/5 items-center">
        <LocationComponent />
      </div>
      <div className="h-1/2 items-center">
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className=" max-w-[1200px] min-w-[1100px] mx-auto">
        <SelectComponent2 onSort={handleSort} />
      </div>
      <div className="flex"></div>
      <div>
        <ListComponent search={search} sort={sort} />
      </div>
    </>
  );
};

export default ListPage;
