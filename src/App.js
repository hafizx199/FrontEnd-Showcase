import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Productlist from './components/productlist'
import Createproduct from './components/createproduct'
import Viewproduct from './components/viewproduct'
class App extends Component {

  render() {
    return (
    
       <Router>
         
        
           <div className="App">
         
           <Routes>
                 <Route exact path='/' element={<Productlist />}></Route>
                 <Route exact path='/create' element={< Createproduct />}></Route>
                 <Route exact path='/view/:id' element={< Viewproduct />}></Route>
                 
          </Routes>
          </div>
       </Router>
   );
  }
}
  
export default App;