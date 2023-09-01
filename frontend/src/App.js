import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home></Home>} />
            <Route exect path='/login' element={<Login></Login>}></Route>
            <Route exect path='/signup' element={<Signup></Signup>}></Route>
            <Route exact path="/myorder" element={<MyOrder></MyOrder>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
