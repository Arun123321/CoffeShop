import {React,useMemo,createContext,useContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import Login from'./Login';
import Dashboard from'./Dashboard';
import Admin from'./Admin';
import Product from'./Product';
import Register from'./Register';
import Wallet from'./Wallet';
import Checkout from'./Checkout';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import MyOrders from './MyOrders';

import PrivateRoute from '../PrivateRoute'
import {
  BrowserRouter as Router,Routes,Route,Link
} from "react-router-dom";
 export  const CartContext = createContext({
  cart: '',
  setCart: () => {},
});
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App()
{
  const [cart, setCart] = useState(null);
const CartContextValue = useMemo(() => {
  return {
    cart,
    setCart
  }
}, [cart]);




return (
    <CartContext.Provider value={CartContextValue}>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <Router>
      
        <Header />
        <Routes>
          <Route exact path="/CoShop/" element={<Main/>} />
         <Route exact path="/CoShop/login/" element={<Login/>} />
          <Route path="/CoShop/dashboard/" element={<Dashboard/>} />
          <Route path="/CoShop/admin-users/" element={<Admin/>} />
           <Route path="/CoShop/admin-products/" element={<Product/>} />
   <Route exact path="/CoShop/register" element={<Register/>} />
           <Route exact path="/CoShop/admin" element={<AdminDashboard/>} />
           <Route exact path="/CoShop/wallet" element={<Wallet/>} />
           <Route exact path="/CoShop/checkout" element={<Checkout/>} />
           <Route exact path="/CoShop/admin-orders" element={<AdminOrders/>} />
           <Route exact path="/CoShop/my-orders" element={<MyOrders/>} />
        </Routes>
    
    
    </Router>
     </CartContext.Provider>
  );
}

function Main() {

const [products, setProducts] = useState(null);
 const { cart, setCart} = useContext(CartContext);


function addTocart(id,e) {
e.target.innerHTML='Adding';
  const data = { id: id,quantity:1 };
    const runApi=axios.post('/CoShop/public/api/cart/add', data,{headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }})
        .then(response => {

       setCart(response.data.data);
   e.target.innerHTML='Added';
  
    toast.success('Added', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

        }).catch((error) => {
       console.log(JSON.stringify(error.response.data ));
       
toast.error(error.response.data, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
      });

}
useEffect(() => {
    


 axios.get('/CoShop/api/getproducts')
        .then(response => {

    setProducts(response.data.data);
        }).catch((error) => {
       
        

      });


  },[]);




    return (
        
            <div className="row justify-content-center">
                <div className="row">

<h4>Products </h4>
{
products!==null?

products.map((product) => {
          return (   <div className="col-md-3 mt-5">

            
                           <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">
    {product.description}
    </p>
    <p className="card-text">
    Rs {product.price}
    </p>
    <a onClick={(e)=>addTocart(product.id,e)} className="btn btn-primary">
      Add To Cart
    </a>
  </div>
</div></div>
          )
        })


:'Empty'

    }











     
                </div>
            </div>
        
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
