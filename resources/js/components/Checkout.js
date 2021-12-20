import {React,useMemo,createContext,useContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import Login from './Login'
import { Route, Navigate,useNavigate,Link    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddCash from './AddCash';
import WiCash from './WiCash';
import EditUser from './EditUser';
import PlaceOrder from './PlaceOrder';
import { CartContext } from "./App.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export  const CheckContext = createContext(
{
  placemodal: '',
  setPlacemodal: () => {},
});
function Checkout() {

  const history = useNavigate();
 const { cart, setCart} = useContext(CartContext);
 
  const [placemodal, setPlacemodal] = useState(false);

 const Contextvalue = useMemo(() => {
  return {
    placemodal,
    setPlacemodal
  }
}, [placemodal]);


  if (sessionStorage.isAuth!=='true') {

//history("/CoShop/public/login"); 
return ( <div className="row justify-content-center">
                <div className="col-md-6">
                    
      <h3>Please Login </h3>

         
<Login/>
                </div>
            </div>)
 } 
  else

  {
function removecart(id,e)
{

e.target.innerHTML='Removing';
  
    const runApi=axios.delete('public/api/cart/remove/'+id,{headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }})
        .then(response => {

       setCart(response.data.data);
   e.target.innerHTML='Removed';
  
    toast.success('Removed', {
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





    return (
   

<CheckContext.Provider value={Contextvalue}>
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
    
      
            <div className="row justify-content-center">




 



                <div className="col-md-6 text-center">
                    
    
<ol class="list-group list-group-numbered " >

{
cart!==null && cart.items.length!==0?

cart.items.map((cartItem) => {
          return (  


  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{cartItem.name}</div>
     {cartItem.price}
    </div>
    <span className="badge bg-primary rounded-pill">{cartItem.quantity}</span>
    <button onClick={(e)=>removecart(cartItem.itemId,e)} className="mx-2 btn btn-primary btn-sm ">Remove</button>
  </li>
 


          )
        })


:<div className="card" >
  <div className="card-body">
    
    <p className="card-text">
   No items 
    </p>
  
   
  </div>
</div>

    }
</ol>
<div className="row justify-content-center">
<div className="col-md-6 mt-4">
{
  cart!==null && cart.total>0?<span> Total : <b>{cart!==null?cart.subtotal:0} </b></span>:null

}
</div>

</div>
<div className="row justify-content-center">
<div className="col-md-6">
{
  cart!==null && cart.total>0?
<button onClick={e => setPlacemodal(true)} className="btn btn-lg btn-primary mt-4"> Proceed</button>
:null
}
</div></div>
      </div>
      </div>
      <PlaceOrder />
         </CheckContext.Provider>
    );
  }
}


export default Checkout;


