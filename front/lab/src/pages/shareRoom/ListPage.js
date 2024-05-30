import RoomComponent from '../../components/common/RoomComponent';
import RoomComponent2 from '../../components/common/RoomComponent2';
import SearchComponent from '../../components/common/SearchComponent';
const ListPage = () => {
  return (
    <>
    <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">
      자취방쉐어
    </div>
    <div className="m-auto w-3/5 rounded-md px-10 py-4">
      <SearchComponent/>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10">
        <RoomComponent />
        <RoomComponent />
        <RoomComponent />
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10">
        <RoomComponent2 />
        <RoomComponent2 />
        <RoomComponent2 />
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10">
        <RoomComponent />
        <RoomComponent />
        <RoomComponent />
      </div>
    </div>
    </>
  );
};

export default ListPage;