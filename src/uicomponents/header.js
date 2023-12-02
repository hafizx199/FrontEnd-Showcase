import { useNavigate } from 'react-router-dom';
  export default function Header() {

const navigate = useNavigate()  
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if( document.getElementById("navbar")!= null){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
  }
  
}

    return (
        <div>
              <header className="sticky top-0 z-50 bg-[#ffcf08]">
                  <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                    <div className="flex w-full items-center justify-between  py-2 lg:border-none">

                      <div className="flex items-center">
                        <a href="/">
                          <span className="sr-only"></span>
                          <img className="h-14 w-auto" src="http://3.bp.blogspot.com/-tbF4XTJuDTA/Tm0i3yxN3jI/AAAAAAAACHY/HQWC0mDljDg/s500/Maybank+logo+2011.png"/>
                        </a>
                      </div>
                  
                    </div>
                  </nav>
              </header>

                
                <div style={{zIndex:12}} id="navbar">
                    <div className="m-2">
                      <button  onClick={() => navigate("/create")} type="button" className="inline-flex items-center rounded border border-white px-2.5 py-1.5 text-l font-medium text-white shadow-sm scale-100 hover:scale-105 ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Create Product    
                          <span className="ml-2">
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                          </span>
                      </button>
                    </div>

                </div>
        </div>
    
    )
  }
  