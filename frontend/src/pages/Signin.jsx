import React, { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../action/userAction';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Errors,setErrors] = useState("");
  const [emailserror,setemailserror] = useState('');
  const [passerror,setpasserror] = useState('');

  const userLogin = useSelector((state) => state.auth);
  const { loading, error, userInfo } = userLogin; // Destructure userInfo from userLogin

  const handleLogin = (e) => {
    e.preventDefault();
    

    if(!email || !password){
      setErrors('All fields are required.');
    }

    if(!email){
      setemailserror("email is required");
    }

    if(!password){
      setpasserror("password is required")
    }
    
    

    dispatch(login(email, password));

   
    
  };

 useEffect(() => {
    
    if (userInfo._id) {
      
      navigate("/home");
    }
  }, [userInfo, navigate]); 

  return (
    <div className="signin">
      {Errors ?<div className="error">{Errors}</div> :error && <div className="error">{error}</div>}
      <div className="container">
        <div className="handle">
          <h1 className="h1">Sign In</h1>
        {}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailserror && <div className="text-red-500 text-center">{emailserror}</div>}
            <input
              type="password"
              className="text"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              {passerror && <div className="text-red-500 text-center">{passerror}</div>}
            <button
              type="submit"
              className="btn"
            >
              {loading ? 'Loading...' : 'LogIn'}
            </button>
            <button className="btn" onClick={()=>navigate("/signup")}>
            
            Register
          
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default Signin;