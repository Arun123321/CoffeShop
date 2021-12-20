

import React, { Component,useState,useContext,useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CashContext } from "./Wallet.js";
import { CheckContext } from "./Checkout.js";
import { CartContext } from "./App.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PlaceOrder = function(props) {
    const { cashmodal, setCashmodal} = useContext(CashContext);
        const [balance, setBalance] = useState(0);
         const { cart, setCart} = useContext(CartContext);
const { placemodal, setPlacemodal} = useContext(CheckContext);
  const  [cash, setCash] = useState(0);
    const  [paymentmethod, setPaymentmethod] = useState(null);
  const [error, setError] = useState('');
  

const handleSubmit= (e) =>{
setError('');
e.preventDefault();
console.log(cash);
if(cart!==null&& cart.subtotal>balance && paymentmethod==='wallet' )
{
setError('Wallet Balance Not Sufficient');
  return false;
}

if(paymentmethod===null)
{
  setError('Please choose a payment method');
  return false;
}
const data = { payment: paymentmethod };
    const runApi=axios.post('/CoShop/public/api/placeorder', data, {
  headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }
})
        .then(response => {

    setPlacemodal(false);
   setCart(null);
    setError('');
    toast.success('Order Placed successfully', {
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
        setError(error.response.data);
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
    

 axios.get('/CoShop/public/api/getwalletbalance', {headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }})
        .then(response => {
console.log(response.data.data);
    setBalance(response.data.data.balance);
        }).catch((error) => {
        setBalance(0);
        setError('Invalid Credentials');

      });


  },[]);
    return (
      <div>
        
        <Modal isOpen={placemodal}
          >
          <ModalHeader>Select Payment Method & Place Order</ModalHeader>
<div className="container">
<div className="row">
<div className="col-md-12">
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="payment"
      id="wallet"
      defaultValue="wallet"  onClick={(e) => setPaymentmethod('wallet')}
    />
    <label className="form-check-label" htmlFor="wallet">
     Wallet
    </label>
  </div>
 <div className="row">
 <span className="mb-2">
 <b>
 Balance : INR {balance}</b>
 </span>
    </div>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="payment"
      id="pay-on-delivery"
      defaultValue="pay-on-delivery" onClick={(e) => setPaymentmethod('pod')}
    />
    <label className="form-check-label" htmlFor="pay-on-delivery">
     Pay on delivery
    </label>
  </div>
</div>
</div>
</div>
          <ModalBody>
           
            
          </ModalBody>
          <ModalFooter>
          <div className="invalid-feedback d-block">
        {error}
      </div>
            <Button color="primary" onClick={handleSubmit} > Place Order </Button>
            <Button color="secondary" onClick={e => setPlacemodal(false)}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  
}
export default PlaceOrder;