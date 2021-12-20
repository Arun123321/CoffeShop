import {React,useMemo,createContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import { Route, Navigate,useNavigate    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddUser from './AddUser';
import EditUser from './EditUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export  const UserContext = createContext({
  modalOpen: '',
  setModalOpen: () => {},
},{
  edit: '',
  setEdit: () => {},
});

function Admin() {

  const history = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
   const [editId, setEditId] = useState(null);
 

   const Contextvalue = useMemo(() => {
  return {
    modalOpen,
    setModalOpen,
    edit,
    setEdit
  }
}, [modalOpen, edit]);
  const [users, setUsers] = useState(null);
  let userDetails=[];

  if (sessionStorage.isAdmin!=='1') {

//history("/CoShop/login"); 
return ( <div className="row justify-content-center">
                <div className="col-md-6">
                    
      <h3>Not Authorized</h3>

                </div>
            </div>)
 } 
  else

  {

useEffect(() => {
    

 axios.get('/CoShop/api/getusers')
        .then(response => {
console.log(response.data.data);
    setUsers(response.data.data);
        }).catch((error) => {
       
        setError('Invalid Credentials');

      });
setDeleted(false);

  },[modalOpen,edit,deleted]);


function editTrigger(id)
{


setEdit(true);
setEditId(id);

}
function deleteTrigger(id)
{


axios.delete('/CoShop/api/delete/'+id)
        .then(response => {
console.log(response.data.data);
toast.error('Deleted', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
   setDeleted(true);
        }).catch((error) => {
          console.log(error);
       toast.error(error.response.data.message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
        setError('Invalid Credentials');

      });

}

    return (
   

   <UserContext.Provider value={Contextvalue}>
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
                <div className="col-md-12">
                    
      <h3>Hi {sessionStorage.user}, Welcome to Admin Dashboard , </h3>
  <AddUser modalOpen={modalOpen}/>
<Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
users!==null?

users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              
              <td>
                <Button
                  color="success"
                  className="mx-2"
                  size="sm"
                  onClick={e => editTrigger(user.id)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={e => deleteTrigger(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )
        })


:'Empty'

    }
          </tbody>
        </Table>
                </div>
            </div>
            <EditUser id={editId}/>
        </UserContext.Provider>
    );
  }
}


export default Admin;


