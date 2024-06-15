import { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
    <label htmlFor="simple-search" className="sr-only">
      Search
    </label>
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-300 block w-full ps-10 p-2"
        placeholder="검색할 키워드를 입력하세요"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="text-white bg-teal-300 hover:bg-teal-400 font-medium rounded-lg text-sm px-4 py-2 w-20 ml-1">
      검색
    </button>
  </form>
  );
};

export default SearchComponent;
