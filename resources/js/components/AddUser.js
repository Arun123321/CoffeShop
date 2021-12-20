

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
import { UserContext } from "./Admin.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUser = function(props) {
    const { modalOpen, setModalOpen} = useContext(UserContext);
  //const [modalOpen, setModalOpen] = useState(value);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

const handleSubmit= (e) =>{

e.preventDefault();
const data = { email: email,password:password,name:name };
    const runApi=axios.post('public/api/register', data)
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
          Add User
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
              <Label for="email">Email</Label>
              <Input id="email" name="email" onChange={e => setEmail(e.target.value)} value={email}/>
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input id="password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
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
export default AddUser;