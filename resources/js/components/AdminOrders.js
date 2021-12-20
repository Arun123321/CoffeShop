import {React,useMemo,createContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import { Route, Navigate,useNavigate    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddProduct from './AddProduct';
import ViewOrder from './ViewOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export  const OrderContext = createContext({
  modalOpen: '',
  setModalOpen: () => {},
},{
  orderid: '',
  setOrderid: () => {},
});

function AdminOrders() {

  const history = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
   const [orderid, setOrderid] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
   const [editId, setEditId] = useState(null);
 

   const Contextvalue = useMemo(() => {
  return {
    modalOpen,
    setModalOpen,
    orderid,
    setOrderid
  }
}, [modalOpen, edit,orderid]);
  const [orders, setOrders] = useState(null);
 const [statuschanged, setStatuschanged] = useState(Math.random());
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
    

 axios.get('public/api/getorders')
        .then(response => {
console.log(response.data.data);
    setOrders(response.data.data);
        }).catch((error) => {
       
        setError('Invalid Credentials');

      });
setDeleted(false);

  },[modalOpen,edit,deleted,statuschanged]);

function changeStatus(status,id)
{

  
  const data={status:status,id:id}
 const runApi=axios.post('public/api/changestatus',data,{headers: {
    'Authorization': 'Bearer '+sessionStorage.accesstoken 
  }})
        .then(response => {

       setStatuschanged(Math.random());
   
  
    toast.success('Changed', {
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
function viewTrigger(id)
{


setModalOpen(true);
setOrderid(id);

}
function deleteTrigger(id)
{


axios.delete('public/api/deleteorder/'+id)
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
   

   <OrderContext.Provider value={Contextvalue}>
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
                    
      <h3>Hi {sessionStorage.user}, Welcome to Order Dashboard , </h3>
  
<Table>
          <thead>
            <tr>
              <th>#OrderId</th>
              <th>User ID</th>
              <th>Subtotal</th>
              <th>Payment Method</th>
               <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
orders!==null?

orders.map((order) => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.subtotal}</td>
               <td>{order.payment}</td>
               <td>{order.status}</td>
              <td>
                <Button
                  color="success"
                  className="mx-2"
                  size="sm"
                  onClick={e => viewTrigger(order.id)}
                >
                  View
                </Button>
                 
  <button
    className="btn btn-sm btn-secondary dropdown-toggle"
    type="button"
    id="status"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  {order.status}
    
  
  
  
  </button>
  <ul
    className="dropdown-menu dropdown-menu-dark"
    aria-labelledby="dropdownMenuButton2"
  >
    <li>
      <a  className="dropdown-item active" value="0" onClick={(e)=>changeStatus(0,order.id)}>
        Pending
      </a>
    </li>
    <li>
      <a className="dropdown-item" value="1" onClick={(e)=>changeStatus(1,order.id)}>
        Shipped
      </a>
    </li>
    <li>
      <a className="dropdown-item" value="2" onClick={(e)=>changeStatus(2,order.id)} >
        Delivered
      </a>
    </li>
    <li>
      <a className="dropdown-item"  value="3" onClick={(e)=>changeStatus(3,order.id)}>
        Canceled
      </a>
    </li>
  </ul>

                <Button
                  color="danger"
                  size="sm"
                  onClick={e => deleteTrigger(order.id)}
                  className='mx-2'
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
            <ViewOrder id={editId}/>
        </OrderContext.Provider>
    );
  }
}


export default AdminOrders;


