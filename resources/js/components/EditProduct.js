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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from "./Product.js";
const EditProduct = function(props) {
    const { edit, setEdit } = useContext(ProductContext);
  //const [editmodalOpen, setEditmodalOpen] = useState(false);
  const [des, setDes] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
 const [product, setProduct] = useState(null);

const handleSubmit= (e) =>{

e.preventDefault();
const data = { id:props.id,description: des,price:price,name:name  };
   const runApi= axios.post('/CoShop/api/updateproduct', data)
        .then(response => {

    setEdit(false);
   
    setError('');
    
 toast.success('updated', {
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
    
if(props.id!==null)
{
 axios.get('/CoShop/api/getproduct/'+props.id)
        .then(response => {

console.log(response.data.data);
    setProduct(response.data.data);

        }).catch((error) => {
       
        setError('Invalid Credentials');

      });
}

  },[edit]);

useEffect(() => {
    
if(product!==null)
{
 setName(product.name);
 setDes(product.description);
  setPrice(product.price);
}

  },[product]);
function closeModal() {
  setEdit(false);
}
    return (
      <div>
        
        <Modal isOpen={edit}
          >
          <ModalHeader>Edit User</ModalHeader>
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
              <Label for="des">Description</Label>
              <Input id="des" name="des" onChange={e => setDes(e.target.value)} value={des}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
          <div className="invalid-feedback d-block">
        {error}
      </div>
            <Button color="primary" onClick={handleSubmit} > save </Button>
            <Button color="secondary" onClick={e => closeModal()}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  
}
export default EditProduct;