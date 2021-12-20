import {React,useMemo,createContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import Login from './Login'
import { Route, Navigate,useNavigate,Link    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddUser from './AddUser';
import EditUser from './EditUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {

  const history = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
   const [editId, setEditId] = useState(null);
 


  if (sessionStorage.isAdmin!=='1') {

//history("/CoShop/login"); 
return ( <div className="row justify-content-center">
                <div className="col-md-6">
                    
      <h3>Please Login as admin to access this page </h3>

         <p> username -   arunpajith123@gmail.com</p>

         <p> password - 1234</p>
<Login/>
                </div>
            </div>)
 } 
  else

  {



    return (
   

<div>
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




 



                <div className="col-md-12 text-center">
                    
      <h3>Hi {sessionStorage.user} </h3>
<div className="mt-5 text-center ">
      <Link className="btn btn-primary mx-2" to="/CoShop/admin-users">
Manage Users
      </Link>
  <Link className="btn btn-primary" to="/CoShop/admin-products">
Manage Products
      </Link>
      <Link className="btn btn-primary mx-2" to="/CoShop/admin-orders">
Manage Orders
      </Link>
      </div>
       </div>
        </div></div>
    );
  }
}


export default AdminDashboard;


