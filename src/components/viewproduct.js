import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import BackHeader from '../uicomponents/backheader'
import Swal from 'sweetalert2'
import compress from 'compress-base64';

export const Viewproduct = () => {

    const { id } = useParams();
    const navigate = useNavigate()

   //{ --- Declare form input --- }  
    const [inputList, setInputList] = useState([{
        id:id,
        name: '',
        quantity:1,
        imagelink:''
        }]);

   //{ --- Declare function to View/Edit products --- }
    const [isEdit, setisEdit] = useState('false')
    const ChangeisEdit = () => {
              setisEdit('true')     
        };
    const ChangeisEditfalse = () => {
            setisEdit('false')   
            const employee = getProductList();
            setInputList(employee);
        };
        
   //{ --- Handle input change in form --- }
    const handleInputChange = (e, index) => {

          let { name, value } = e.target;
            if(name === 'quantity' && value <= -1){
                value=0
            }
          const list = [...inputList];
          list[index][name] = value;
          setInputList(list);
      
        };

//{ --- Handle quantity change in form --- }
    const handleQuantitychange = (e, index,button) => {
   

      let name = 'quantity'
      let value=e
console.log(value)
      if(button == 'minus'){
        value--

        if(value <= 0){
          ConfirmationPopup()
          value = 0
        }
      }

      if(button == 'plus'){
        value++
      }
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
  
    };
     
        
    //{ ---Handle Image upload function --- }
  
    const onChangeImage = (e,index) => { 
      console.log("file uploaded: ", e.target.files[0]);
      let file = e.target.files[0];
  
        if (file) {
          const {name} = e.target;
          const reader = new FileReader();
          reader.onload = event => {
            compress(event.target.result, {
              width: 400,
              type: 'image/png', // default
   
              quality: 0.8
            }).then(result => {
              let finalbase64 = result.replaceAll("data:image/png;base64,", "");
              const list = [...inputList];
              list[index][name] = finalbase64;
              setInputList(list);
              // console.log(finalbase64);
            });
          };
          reader.readAsDataURL(file);
    

        }
      };


    const imageHandler = (e,index) => {
      onChangeImage(e, index)
      handleInputChange(e, index)
      window.scrollTo(0,0)
    }


    //{ --- Get current product details --- }
    const getProductList = () => {

      if (!localStorage["products"]) {
        localStorage["products"] = "[]";
      }
        let productlist = localStorage["products"];
        productlist = JSON.parse(productlist);

        let product = []
        productlist.forEach ( e => {
          if(e.id === id){
              product.push(e);
          }
        })
        return product
    };
          
      
    //{ --- Edit current product details --- }
    const editProduct = () => {

          PopupInfo()
          let productlist = localStorage["products"];
          productlist = JSON.parse(productlist);

          let product = []
          productlist.forEach ( e => {
            if(e.id !== id){
                product.push(e);
            }
          })
          inputList.forEach ( e => {
              product.push(e);
            })

      localStorage["products"] = JSON.stringify(product);
      ChangeisEditfalse()
    };


     //{ --- Delete current product --- }
    const deleteProduct = () => {
            let productlist = localStorage["products"];
            productlist = JSON.parse(productlist);

            let product = []
            productlist.forEach ( e => {
              if(e.id !== id){
                  product.push(e);
              }
          
            })
      
      localStorage["products"] = JSON.stringify(product);
      };
        
        
        

  //{ --- Successfully Edit Product Popup --- }
  const PopupInfo = () =>
  {
    Swal.fire({
      title: 'Saved',
      text: "Successfully edited product",
      icon: 'success',
      confirmButtonColor: '#559871',
      
    })
  }

  //{ --- Delete Product Confirmation --- }
  const ConfirmationPopup = () =>
  {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This product will be deleted',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#559871',
        cancelButtonColor: '#d33', 
        confirmButtonText: 'Yes'
     }).then((result) => {
        if(result.value){
            Swal.fire({
                title: 'Product Deleted',
                text: "Successfully deleted product",
                icon: 'success',
                confirmButtonColor: '#559871',
                
              })
            deleteProduct()
            navigate("/")
       }
     })
  }

    
     //{ --- Get product details on page open --- }     
    useEffect(() => {
        window.scrollTo(0,0)
        if (id) {
            const employee = getProductList();
            setInputList(employee);
        }
        // eslint-disable-next-line
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
   

    return (

        <div className="fadeMe App">
          

            <BackHeader/>

            {inputList.map((product, i) => {
          return (
            <div key={product.id} className="my-4 mx-4 md:grid md:grid-cols-3 md:gap-6">
    
              <div className="image-frame">
                    {product.imagelink !== '' && <img alt='productimage' className="view-image" src={`data:image;base64,${product.imagelink}`} />}
                    {product.imagelink === '' && <img alt='productimage' className="view-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"/>}     
              </div>
            
        
              <div className="input-form-frame">
                    <div className="input-form-topinput">
                      
                      {isEdit === 'false' &&
                          <div className="fadeMe">

                              <div className="sm:col-span-2">
                                  <label className="input-label">
                                    Product Name
                                  </label>
                                  <h5 className="input-view">{product.name}</h5>
                              </div>

                              <div className="sm:col-span-2">
                                  <div className='row'>

                                    <div className='col'>
                                      <label  className="input-label">
                                      Quantity
                                      </label>
                                      <h5 className="input-view">{product.quantity}</h5>
                                      
                                    </div>

                                    <div className='col'>
                                      
                                    </div>

                                  </div>
                              </div>



                              <div className="sm:col-span-2">
                                <label className="input-label">
                                  Date Created
                                </label>
                                <h5 className="input-view">
                                  {product.id.replace('-', '/').replace('-', '/').slice(0,10)}</h5>
                              </div>
                          </div>
                      }
                    
                    {isEdit === 'true' &&
                        <div className="fadeMe">

                          <div className="sm:col-span-2">
                            <label className="input-label">
                              Product Name
                            </label>
                            <div className="mt-1">
                              <input
                                name="name"
                                type="text"
                                placeholder='Product Name'
                                value={product.name}
                                onChange={e => handleInputChange(e, i)}
                                className="input-frame"
                              />
                            </div>
                            {product.name === '' &&
                              <label className="input-label mt-1 text-red-500">
                              Product name cannot be empty
                            </label>
                            }
                          </div>

                          <div className="my-2 sm:col-span-2">

                          <label  className="input-label">
                              Image
                            </label>

                            <input
                            className="input-frame"
                          type="file"
                          name="imagelink"
                          id="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={e => imageHandler(e,i)}
                          />
                          </div>
                    
                          <div className="my-2 sm:col-span-2">
                            <div className='row'>

                            <div className='col'>
                                      <label  className="input-label">
                              Quantity
                            </label>
                                                 
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button onClick={e => handleQuantitychange(product.quantity, i,'minus')} data-action="decrement" className="pb-1 bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none">
                              <span className="m-auto b-1 text-2xl font-thin">−</span>
                            </button>
                            <input
                                className="text-center outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default text-gray-700  outline-none"
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={e => handleInputChange(e, i)}
                          />
                          <button onClick={e => handleQuantitychange(product.quantity, i,'plus')} data-action="increment" className="pb-1 bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                          </div>
                            {product.quantity == 0 &&
                              <label className="input-label mt-1 text-red-500">
                              Quantity invalid
                            </label>
                            }
                            </div>

                            <div className='col'>



                            </div>
                            </div>


                          </div>

                          <div className='sm:col-span-2'>

                          </div>
                        </div>
                    }
                
                    </div>

                  <div className="input-form-bottom">
          
                    {isEdit === 'true' && product.name !== '' && product.quantity != 0 && 
                      <button  onClick={() => editProduct()}type="button" className="bg-[#559871] input-button">
                      Save 
                        <span className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </span>
                      </button>
                    }

                    { (product.name === '' || product.quantity  == 0) && 
                    <button  type="button" className="opacity-20 bg-gray-400 input-button">
                    Save 
                    <span className="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </span>
                    </button>
                    }

                    {isEdit ==='false' && 
                    <button  onClick={() => ChangeisEdit()}type="button" className="bg-gray-100 text-black input-button">Edit
                      <span className="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </span>
                    </button>
                    }

                    {isEdit === 'true' && 
                    <button  onClick={() => ChangeisEditfalse()}type="button" className="bg-gray-400 input-button">Cancel</button>
                    }


                    {isEdit === 'true' && 
                    <button  onClick={() => ConfirmationPopup()}type="button" className="bg-red-400 input-button">Delete</button>
                    }

                  </div>
   
      
              </div>
            </div>
     
          )
        })}
    

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

    
  
  
      </div>
  
     
    )
}

export default Viewproduct;