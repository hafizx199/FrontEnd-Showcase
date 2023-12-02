import { useNavigate } from 'react-router-dom';
  export default function BackHeader() {

    const navigate = useNavigate()

    return (
        <div className='p-1 sticky top-0 z-50 bg-[#333333]'>
            <header className="">
              <div className="m-2">
                  <button  onClick={() => navigate("/")} type="button" className="py-2 pr-4 inline-flex items-center rounded border border-white px-2.5 py-1.5 text-sm font-medium text-white shadow-sm scale-100 hover:scale-105 ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> 
    
                  <span className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                  </span>
                    BACK
                  </button>
              </div>
            </header>
        </div>
    
    )
  }
  