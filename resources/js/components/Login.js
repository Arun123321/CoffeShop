import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from'./Header'
import { Route, Navigate,useNavigate    } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
 const history = useNavigate();
const handleSubmit= (e) =>{

e.preventDefault();
const data = { email: email,password:password };
    axios.post('/CoShop/api/login', data)
        .then(response => {

    sessionStorage.setItem('accesstoken',response.data.access_token);
    sessionStorage.setItem('isAuth','true');
     sessionStorage.setItem('isAdmin',response.data.user.is_admin);
      sessionStorage.setItem('user',response.data.user.name);
    setError('');
    if(response.data.user.is_admin==1)
    {
       history("/CoShop/admin"); 
    }
    else
    {
    history("/CoShop"); 

  }

        }).catch((error) => {
       
        setError('Invalid Credentials');

      });
  
}





    return (
    
            <div className="row justify-content-center">
                <div className="col-md-6">
                    
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="InputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="InputEmail" onChange={e => setEmail(e.target.value)}  value={email} 
    />
     
  </div>
  <div className="mb-3">
    <label htmlFor="InputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="InputPassword"  onChange={e => setPassword(e.target.value)}  value={password} 
    />
     <div className="invalid-feedback d-block">
        {error}
      </div>
  </div>
 
  <button type="submit"  className="btn btn-primary">
    Submit
  </button>
</form>

                 

                </div>
            </div>
        
    );
}

export default Login;


