

import React, { Component,useState,useContext } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddCash = function(props) {
    const { cashmodal, setCashmodal} = useContext(CashContext);
        const { balance, setBalance} = useContext(CashContext);

  const  [cash, setCash] = useState(0);
  const [error, setError] = useState('');
  

const handleSubmit= (e) =>{

e.preventDefault();
console.log(cash);
const data = { balance: cash };
    const runApi=axios.post('/CoShop/public/api/addtowallet', data, {
  headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }
})
        .then(response => {

    setCashmodal(false);
   
    setError('');
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
    return (
      <div>
        
        <Modal isOpen={cashmodal}
          >
          <ModalHeader>Add new User</ModalHeader>
          <ModalBody>
            <FormGroup >
              <Label for="cash">Amount</Label>
              <Input id="name" name="cash" onChange={e => setCash(e.target.value)}  value={cash}/>
            </FormGroup>
            
          </ModalBody>
          <ModalFooter>
          <div className="invalid-feedback d-block">
        {error}
      </div>
            <Button color="primary" onClick={handleSubmit} > Add </Button>
            <Button color="secondary" onClick={e => setCashmodal(false)}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  
}
export default AddCash;