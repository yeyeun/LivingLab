const LocationComponent = () => {
    return(
        <div className="flex items-center mx-auto w-fit">
            <button type="button" className="px-3 py-1 mb-2 text-sm font-medium text-center inline-flex items-center text-gray-800 bg-white rounded-3xl border border-gray-800 hover:bg-gray-50">
                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                </svg>
            현재 위치를 설정해주세요
            </button>
        </div>
    );
}

export default LocationComponent;