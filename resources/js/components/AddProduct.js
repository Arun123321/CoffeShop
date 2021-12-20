

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
import {ProductContext } from "./Product.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = function(props) {
    const { modalOpen, setModalOpen} = useContext(ProductContext);
  //const [modalOpen, setModalOpen] = useState(value);
  const [des, setDes] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');

const handleSubmit= (e) =>{

e.preventDefault();
const data = { description: des,price:price,name:name };
    const runApi=axios.post('/CoShop/api/createproduct', data)
        .then(response => {

    setModalOpen(false);
   
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
        <Button className="float-right mb-4" color="primary" onClick={e => setModalOpen(true)}>
          Add Product
        </Button>
        <Modal isOpen={modalOpen}
          >
          <ModalHeader>Add new User</ModalHeader>
          <ModalBody>
            <FormGroup >
              <Label for="name">Name</Label>
              <Input id="name" name="name" onChange={e => setName(e.target.value)}  value={name}/>
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input id="price" name="price" onChange={e => setPrice(e.target.value)} value={price}/>
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input id="description" name="description" onChange={e => setDes(e.target.value)} value={des} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
          <div className="invalid-feedback d-block">
        {error}
      </div>
            <Button color="primary" onClick={handleSubmit} > Add </Button>
            <Button color="secondary" onClick={e => setModalOpen(false)}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  
}
export default AddProduct;