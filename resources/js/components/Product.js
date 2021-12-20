import {React,useMemo,createContext,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import { Route, Navigate,useNavigate    } from 'react-router-dom';
import { Table, Button } from "reactstrap";
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 export  const ProductContext = createContext({
  modalOpen: '',
  setModalOpen: () => {},
},{
  edit: '',
  setEdit: () => {},
});

function Product() {

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
  const [products, setProducts] = useState(null);
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
    

 axios.get('public/api/getproducts')
        .then(response => {
console.log(response.data.data);
    setProducts(response.data.data);
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


axios.delete('public/api/deleteproduct/'+id)
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
   

   <ProductContext.Provider value={Contextvalue}>
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
                    
      <h3>Hi {sessionStorage.user}, Welcome to Product Dashboard , </h3>
  <AddProduct modalOpen={modalOpen}/>
<Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
products!==null?

products.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
               <td>{product.description}</td>
              <td>
                <Button
                  color="success"
                  className="mx-2"
                  size="sm"
                  onClick={e => editTrigger(product.id)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={e => deleteTrigger(product.id)}
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
            <EditProduct id={editId}/>
        </ProductContext.Provider>
    );
  }
}


export default Product;


