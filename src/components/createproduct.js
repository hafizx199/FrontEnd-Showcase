import {useState} from 'react';
import { BrowserRouter as Route, useNavigate} from "react-router-dom";
import BackHeader from '../uicomponents/backheader'
import Swal from 'sweetalert2'
import compress from 'compress-base64';

function App() {

  const navigate = useNavigate();

   //{ --- Generate unique Product ID --- }  
  const GenerateProductID = () => {
    let separator = '-'
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
      let datetime = `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    var num = Math.random() * 999999
    var finalnum = Math.floor(num) //convert to whole number
    var rnd = finalnum.toString().padStart(4, '0')
    let randomgeneratednumber = rnd
  
    let productID = datetime +'-'+ randomgeneratednumber
   return productID
  
  }

   //{ --- Declare form input --- }  
  const [inputList, setInputList] = useState([{
    id:GenerateProductID(),
    name: '',
    quantity:1,
    imagelink:''
    }]);

   //{ --- Input form onChange function --- }  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };


  //{ --- Handle Image upload function --- }  
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


  let imageHandler = (e,index) => {
    onChangeImage(e, index)
    handleInputChange(e, index)
  }


  //{ --- Get product from localStorage --- }  
  const getProductList = () => {
    if (!localStorage["products"]) {
      localStorage["products"] = "[]";
    }

      let productlist = localStorage["products"];
      productlist = JSON.parse(productlist);
      return productlist
  };
  
  //{ --- Add product to localStorage --- }  
  const addProduct = () => {
    const productslist = getProductList();
    inputList.forEach ( e => {
      productslist.push(e);
    })
    localStorage["products"] = JSON.stringify(productslist);  
    
    Swal.fire({
      title: 'Product Created',
      text: "Successfully created product",
      icon: "success",
      confirmButtonColor: '#559871',
      
    })
    navigate("/")
  };



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

                      <div className="fadeMe">

                        <div className="sm:col-span-2">
                          <label className="input-label">
                            Product Name
                            <span className='text-red-400 ml-1'>*</span>
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
                            <label className="input-label mt-1">
                            Product enter product name
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
                            <span className='text-red-400 ml-1'>*</span>
                            </label>
                          <input
                              className="input-frame"
                          name="quantity"
                          type="number"
                          placeholder="Quantity"
                          value={product.quantity}
                          onChange={e => handleInputChange(e, i)}
                        />
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
                      </div>
                  
              
                  </div>

                <div className="input-form-bottom">
        
        
                {(product.name !== '' && product.quantity != 0 )&& 
                      <button  onClick={() => addProduct()}type="button" className="bg-[#559871] input-button">
                      Create Product 
                        <span className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </span>
                      </button>
                    }

                    { (product.name === '' || product.quantity  == 0) && 
                    <button  type="button" className="opacity-20 bg-gray-400 input-button">
                    Create Product 
                    <span className="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </span>
                    </button>
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
  );
}

export default App;
