import ListComponent from '../../components/shareRoom/ListComponent';
import LocationComponent from '../../components/common/location/LocationComponent';
import { useState } from 'react';
import SearchComponentForRoom from '../../components/shareRoom/SearchComponentForRoom';

const ListPage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (query) => {
    setSearch(query);
  };



  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">자취방쉐어</div>
      {/* <div className="m-auto w-2/5 items-center">
        <LocationComponent />
      </div> */}
      <div className='pt-10 h-1/2 items-center'>
        <SearchComponentForRoom onSearch={handleSearch}/>
      </div>
      <div>
        <ListComponent search={search} />
      </div>
    </>
  );
};

export default ListPage;
