import {React,useMemo,createContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import Login from './Login'
import { Route, Navigate,useNavigate,Link    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddCash from './AddCash';
import WiCash from './WiCash';
import EditUser from './EditUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export  const CashContext = createContext({
  cashmodal: '',
  setCashmodal: () => {},
},{
  balance: '',
  setBalance: () => {},
},
{
  cashmodalw: '',
  setCashmodalw: () => {},
});
function Wallet() {

  const history = useNavigate();

  const [cashmodal, setCashmodal] = useState(false);
   const [cashmodalw, setCashmodalw] = useState(false);
   const [balance, setBalance] = useState(0);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
   const [editId, setEditId] = useState(null);
 const Contextvalue = useMemo(() => {
  return {
    cashmodal,
    setCashmodal,
    balance,
    setBalance,
    cashmodalw,
    setCashmodalw
  }
}, [cashmodal,balance,cashmodalw]);


  if (sessionStorage.isAuth!=='true') {

//history("/CoShop/login"); 
return ( <div className="row justify-content-center">
                <div className="col-md-6">
                    
      <h3>Please Login </h3>

         
<Login/>
                </div>
            </div>)
 } 
  else

  {

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
setDeleted(false);

  },[cashmodal,cashmodalw]);




    return (
   

<CashContext.Provider value={Contextvalue}>
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

      <p>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Wallet</h5>
    <p className="card-text">
    Current Balance : Rs {balance}/-
    </p>
 
  </div>
</div>

      </p>
<div className="mt-5 text-center ">
      <button onClick={e => setCashmodal(true)} className="btn btn-primary mx-2" >
Add Money
      </button>
  <button onClick={e => setCashmodalw(true)} className="btn btn-primary" >
Withdarw Money
      </button>
      </div>
       </div>
        </div>
        <AddCash/>
       <WiCash/>
         </CashContext.Provider>
    );
  }
}


export default Wallet;


