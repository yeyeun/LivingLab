import ListComponent from '../../components/team/ListComponent';
import SearchComponent from '../../components/common/SearchComponent';
import LocationComponent from '../../components/common/location/LocationComponent';
import SelectComponent from '../../components/common/SelectComponent';
import LandingComponent from '../../components/common/mapSearch/LandingComponent';

const ListPage = () => {
  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">동네모임</div>

      <div className="m-auto w-2/5 items-center">
        <LocationComponent />
      </div>

      <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
        <SearchComponent />
        <SelectComponent />
        <ListComponent />
      </div>
    </>
  );
};

export default ListPage;
