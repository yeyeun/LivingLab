import ListComponent from '../../components/shareRoom/ListComponent';
import LocationComponent from '../../components/common/LocationComponent';

const ListPage = () => {
  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">
        자취방쉐어
      </div>
      <div className="m-auto w-2/5 items-center">
      <LocationComponent/>
      </div>
      <div>
        <ListComponent/>
      </div>
    </>
  );
};

export default ListPage;