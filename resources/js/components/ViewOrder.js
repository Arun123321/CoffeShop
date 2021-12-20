

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
import { OrderContext } from "./AdminOrders.js";
const ViewOrder = function(props) {
    const { modalOpen, setModalOpen } = useContext(OrderContext);
     const { orderid, setOrderid } = useContext(OrderContext);
  //const [modalOpen, setModalOpen] = useState(value);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 const [orders, setOrders] = useState(null);
const handleSubmit= (e) =>{

e.preventDefault();
const data = { email: email,password:password,name:name };
    axios.post('public/api/register', data)
        .then(response => {

    setModalOpen(false);
   
    setError('');
    

        }).catch((error) => {
       console.log(JSON.stringify(error.response.data ));
        setError(error.response.data);

      });
      }



useEffect(() => {
    


 axios.get('public/api/getorder/'+orderid)
        .then(response => {

    setOrders(response.data.data);
        }).catch((error) => {
       
        

      });


  },[modalOpen]);

    return (
      <div>
       

 




        <Modal isOpen={modalOpen}
          >
          <ModalHeader>Order View</ModalHeader>
          <ModalBody>
<div>
<div className="card border-primary mb-3" >
 
     
  <div className="card-body text-primary">
  <ol className="list-group ">
   <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Total</div>
     {orders!==null?orders.subtotal:null}
    </div>
   
  </li>
   <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Payment Method</div>
      {orders!==null?orders.payment:null}
    </div>
   
  </li>
  </ol>
  </div>
  
</div>
            <ol className="list-group ">

 <div className="card-header">Order Items</div>
{
orders!==null && orders.items.length!==0?

orders.items.map((orderItem) => {
          return (  


 <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{orderItem.name}</div>
     {orderItem.price}
    </div>
    <span className="badge bg-primary rounded-pill"> {orderItem.quantity}</span>
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
</div>
          </ModalBody>
          <ModalFooter>
          <div className="invalid-feedback d-block">
        {error}
      </div>
           

            <Button color="secondary" onClick={e => setModalOpen(false)}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  
}
export default ViewOrder;