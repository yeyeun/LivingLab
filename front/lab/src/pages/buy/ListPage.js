import ListComponent from '../../components/common/ListComponent';
import LocationComponent from '../../components/common/LocationComponent';
import SearchComponent from '../../components/common/SearchComponent';
import SelectComponent from '../../components/common/SelectComponent';

const ListPage = () => {
  return (
    <>
    <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">
      공동구매
    </div>
    <div className="m-auto w-2/5 items-center">
      <LocationComponent/>
    </div>
    <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
      <SearchComponent/>
      <SelectComponent/>
      <ListComponent />
      <ListComponent />
      <ListComponent />
    </div>
    </>
  );
};

export default ListPage;