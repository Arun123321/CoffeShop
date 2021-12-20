

import React, { Component,useState,useContext,useEffect } from "react";
import ReactDOM from 'react-dom';
import {Link, Route, Navigate,useNavigate    } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Popover, PopoverHeader, PopoverBody,UncontrolledPopover } from "reactstrap"
import { CartContext } from "./App.js";
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Header() {
const history = useNavigate();
 const { cart, setCart} = useContext(CartContext);



useEffect(() => {
    


 axios.get('/CoShop/api/cart/',{headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }})
        .then(response => {

    setCart(response.data.data);
        }).catch((error) => {
       
        

      });


  },[]);

function removecart(id,e)
{

e.target.innerHTML='Removing';
  
    const runApi=axios.delete('/CoShop/api/cart/remove/'+id,{headers: {
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
const logout =(e) => {
e.preventDefault();
sessionStorage.clear();
 history("/CoShop/login"); 
}


    return (
    	 <div>
          <div className="row justify-content-center mb-5">
                <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarTogglerDemo03"
    aria-controls="navbarTogglerDemo03"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
    <Link className="nav-link" to="/CoShop/">
    CoffeShop
</Link>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">

      <Link className="nav-link" to="/CoShop/">Home</Link>

        
      </li> <li className="nav-item active">

      <Link className="nav-link" to="/CoShop/admin">Admin</Link>

        
      </li>

      {
        sessionStorage.isAuth!=='true'?
      <li className="nav-item">
              <Link className="nav-link" to="/CoShop/login">Login</Link>

      </li>:<li className="nav-item">
              <a className="nav-link"   onClick={logout}>Logout</a>

      </li>
     }
     {
        sessionStorage.isAuth!=='true'?
      <li className="nav-item">
              <Link className="nav-link" to="/CoShop/register">Register</Link>

      </li>:null
     }

    {
        sessionStorage.isAuth==='true' && sessionStorage.isAdmin==='1'?
       <li className="nav-item">
               <Link className="nav-link" to="/CoShop/admin-users">
Manage Users
      </Link>

      </li>:null
     }
         {
        sessionStorage.isAuth==='true' && sessionStorage.isAdmin!=='1'?
       <li className="nav-item">
               <Link className="nav-link" to="/CoShop/wallet">
Wallet
      </Link>

      </li>:null
     }

         {
        sessionStorage.isAuth==='true' && sessionStorage.isAdmin!=='1'?
       <li className="nav-item">
               <Link className="nav-link" to="/CoShop/my-orders">
My Orders
      </Link>

      </li>:null
     }
  {
        sessionStorage.isAuth==='true'  && sessionStorage.isAdmin==='1'?
           
      <li className="nav-item">
              <Link className="nav-link" to="/CoShop/admin-products">
Manage Products
      </Link>

      </li>:null
     }

  {
        sessionStorage.isAuth==='true'  && sessionStorage.isAdmin==='1'?
           
      <li className="nav-item">
              <Link className="nav-link" to="/CoShop/admin-orders">
Manage Orders
      </Link>

      </li>:null
     }
        {
        sessionStorage.isAuth==='true' && sessionStorage.isAdmin!=='1' ?
           
      <li className="nav-item">
              <div>
  <Button
    id="UncontrolledPopover"
    type="button" 
  >
   <svg className="px-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg> Cart<span className="badge position-absolute top-0 btn-danger">
   {cart!==null?cart.items.length:0}
    
  </span>
  </Button>
  <UncontrolledPopover
    placement="bottom" trigger="focus" 
    target="UncontrolledPopover" 
  >
    <PopoverHeader>
    Total :{cart!==null?cart.subtotal:0} 
    </PopoverHeader>
    <PopoverBody>
    
<ol class="list-group list-group-numbered overflow-auto"  style={{height: cart!==null && cart.items.length!==0?'200px':'auto'}}>

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
<div className="row">


<Link  className="btn btn-sm btn-primary" to="/CoShop/checkout">  Checkout  </Link>

</div>
    </PopoverBody>
  </UncontrolledPopover>
</div>

      </li>:null
     }
       
    
     
     
   
    
    </ul>
   
  </div>
</nav>
    </div>
            </div>
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
        </div>
    );
}

export default Header;

