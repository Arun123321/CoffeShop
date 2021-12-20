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
import { UserContext } from "./Admin.js";
const EditUser = function(props) {
    const { edit, setEdit } = useContext(UserContext);
  //const [editmodalOpen, setEditmodalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 const [user, setUser] = useState(null);

const handleSubmit= (e) =>{

e.preventDefault();
const data = { id:props.id,email: email,name:name };
   const runApi= axios.post('/CoShop/api/update', data)
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
 axios.get('/CoShop/api/getuser/'+props.id)
        .then(response => {

console.log(response.data.data);
    setUser(response.data.data);

        }).catch((error) => {
       
        setError('Invalid Credentials');

      });
}

  },[edit]);

useEffect(() => {
    
if(user!==null)
{
 setName(user.name);
 setEmail(user.email);
}

  },[user]);
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
              <Label for="email">Email</Label>
              <Input id="email" name="email" onChange={e => setEmail(e.target.value)} value={email}/>
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
export default EditUser;