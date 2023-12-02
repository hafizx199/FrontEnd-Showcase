import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Route,useNavigate} from "react-router-dom";
import Header from '../uicomponents/header'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


export default function Productlist() {

  const [productlist, setProductlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductlist(getProductList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  //{ --- Get list of products from localStorage --- }  
 function getProductList() {
  if (!localStorage["products"]) {
    localStorage["products"] = "[]";
  }

    let productlist = localStorage["products"];
    productlist = JSON.parse(productlist);
    return productlist
  }




 
  return (
  <div className="">

        <Header/>



      <div className="fadeMe relative bg-grey-800">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="http://www.maybankfoundation.com/media/zoo/images/whoweare_b57bf1fd7083af177f00aefa32aa854f.jpg"
            alt="productimage"
          />
          <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl py-12 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-white header-text"> Frontend Assessment</h1>
            <p className="italic input-label text-white">Muhammad Hafiz Bin Shaifull Naim</p>
        </div>
      </div>


    

        <div className='container pb-4 my-4'>

          <button  onClick={() => navigate("/create")}  type="button" className="header-text">Product List 
              <span className="scale-90 hover:scale-105 ease-in duration-200 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-[#559871] w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
          </button>

          <div className="fadeMe2">
              <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {productlist.map((product) => (
                        <div key={product.id} className="scale-100 hover:scale-105 ease-in duration-200 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 group relative">
                              <div className="h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200  lg:aspect-none lg:h-60">
                                {product.imagelink !== '' && <img alt="productimage" className="h-full w-full object-cover object-center lg:h-full lg:w-full" src={`data:image;base64,${product.imagelink}`} />}
                                {product.imagelink === '' && <img alt="productimage" className="h-full w-full object-cover object-center lg:h-full lg:w-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"/>}
                              </div>
                          <div className="p-3">

                                <p className="text-xl header-text">{product.name}</p>
                                <p className="input-label">
                                  Quantity: {product.quantity}
                                </p>

                                <button  onClick={() => navigate("view/"+`${product.id}`)}type="button" className="btn-viewproduct"> 
                                  VIEW
                                  
                                  <span className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                  </span>
                                </button>
                        </div>
                        </div>
                      ))}
                      {productlist.length === 0 && 
                      <div>
                                <div className="text-lg text-gray-900">
                                  Looks like there is no product yet ...
                                    <p className="text-sm text-gray-900">
                                    Add products by clicking '+' above
                                    </p>
                                </div>  
                      </div>           
                      }
                </div>
              </div>
          </div>

        </div>

      <div className='pb-4 fadeMe2 border-gray-600 border bg-[#f5f5f5] '>
          <div className='container '>
            <h2 className="my-4 text-2xl font-bold tracking-tight sm:text-2xl">Featured Products</h2>

                  {productlist.length === 0 && 
                          <div className='ml-6'>
                                    <p className="text-sm text-gray-900">
                                      No products available ...
                                    </p>            
                          </div>        
                  }

              <Carousel autoPlay interval="5000" transitionTime="1000" infiniteLoop showThumbs={false} showArrows={true} showStatus={false} className='' >
                
              {productlist.map((product) => (
                <div key={product.id} className="overflow-hidden rounded bg-white mx-4 mb-2 shadow-md">
                <div className="relative mx-auto max-w-7xl py-2 pb-4 px-4 sm:px-6 lg:px-8">
                  <div className="absolute top-0 bottom-0 left-3/4 hidden w-screen lg:block" />
                
                  <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="relative lg:col-start-2 lg:row-start-1">
                    
                      <div className="">
              
                          <div className="aspect-w-4 aspect-h-4 lg:aspect-none">
                          <div key={product.id} className="">
                          <div className="scale-100 hover:scale-105 ease-in duration-200 h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-60">
                            {product.imagelink !== '' && <img alt="productimage" className="h-full w-full object-contain object-center lg:h-full lg:w-full" src={`data:image;base64,${product.imagelink}`} />}
                            {product.imagelink === '' && <img alt="productimage" className="bg-[#EEEEEE] h-full w-full object-contain object-center lg:h-full lg:w-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"/>}
                          </div>
                
                          </div>

                          </div>
                        
                      
                      </div>
                    </div>
                    <div className="mt-8 ml-0 lg:ml-4 lg:h-full">
                    
                      <div className="mx-auto max-w-prose text-base lg:max-w-none">
                      <div className='text-left'>

                      <h2 className="italic text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-3xl">{product.name}</h2>
                      <p className="input-label">
                          Quantity: {product.quantity}
                        </p>
                        
                        <button onClick={() => navigate("view/"+`${product.id}`)} className="btn-viewproduct">
                            VIEW
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                      
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
                ))}

              </Carousel>
        
        

          </div>

      </div>

  </div>
  );
}
