import ListComponent from '../../components/shareRoom/ListComponent';

const ListPage = () => {
  return (
    <>
      <div className="m-auto w-2/5 pb-2 text-3xl font-Jua">
        자취방쉐어
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10">
        <ListComponent/>
      </div>
    </>
  );
};

export default ListPage;