import React from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header';
import { Route, Navigate,useNavigate    } from 'react-router-dom';

function Dashboard() {

  const history = useNavigate();

  if (sessionStorage.isAuth!=='true') {

//history("/CoShop/login"); 
return (<Navigate to='/login'/>)
 } 
  else

  {
    return (
    
            <div className="row justify-content-center">
                <div className="col-md-6">
                    
      <h3>Welcome, {sessionStorage.user}</h3>

                </div>
            </div>
        
    );
  }
}

export default Dashboard;


