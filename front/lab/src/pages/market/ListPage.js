import ListComponent from '../../components/common/ListComponent';
import SearchComponent from '../../components/common/SearchComponent';

const ListPage = () => {
  return (
    <>
    <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">
      동네장터
    </div>
    <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
      <SearchComponent/>
      <ListComponent />
      <ListComponent />
      <ListComponent />
    </div>
    </>
  );
};

export default ListPage;