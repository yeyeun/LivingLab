const AddComponent = () => {
    return(
        <div>
        <form>
            <div className="space-y-12 text-base">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label for="category" className="block font-medium leading-6 text-gray-900">카테고리</label>
                            <div className="mt-2">
                                <select id="category" name="category" autocomplete="category-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                    <option>인테리어</option>
                                    <option>부동산</option>
                                    <option>할인정보</option>
                                    <option>기타</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label for="title" className="block font-medium leading-6 text-gray-900">제목</label>
                            <div className="mt-2">
                                <input type="text" name="title" id="title" autocomplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label for="about" className="block font-medium leading-6 text-gray-900">내용</label>
                            <div className="mt-2">
                                <textarea id="about" name="about" rows="6" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"></textarea>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <label for="about" className="block text-sm font-medium leading-6 text-gray-900">사진 업로드</label>
                            <div className="mt-2">
                                <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">취소하기</button>
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">등록하기</button>
            </div>
        </form>
    </div>
    );
}

export default AddComponent;