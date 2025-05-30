import Collection from '../pages/Collection';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Order from '../pages/Order';
import PlaceOrder from '../pages/PlaceOrder';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <ToastContainer />
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
