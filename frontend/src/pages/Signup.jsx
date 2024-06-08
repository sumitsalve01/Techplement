import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../action/userAction';
import '../pages/Signup'

const Signup = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  // State variables for form fields and error handling
  const [fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nameerror,setnameerror] = useState(" ");
  const [passworderror,setpassworderror] = useState(" ");
  const [emailerror,setemailerror] = useState(" ");

  // Redux state for loading and error messages
  const userRegister = useSelector((state) => state.auth);
  const { loading, error: registrationErrormessage } = userRegister;

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!fullname || !Email || !Password) {
      setError('All fields are required.');

      if(!fullname){
        setnameerror("Name is required")
      }
      if(!Email){
        setemailerror("email is required")
      }
      if(!Password){
        setpassworderror("password is required")
      }
     }

    // Dispatch register action
    dispatch(register(fullname, Email,Password));

    // Reset form fields and error message
    setFullname('');
    setEmail('');
    setPassword('');
    setError('');
    setnameerror('');
    setpassworderror('');
    setemailerror('');

    // Navigate to home page or display success message after registration
    if(!error){
      nav("/");
    }
  };

  return (
    <div className="signup">
      {error && <div className="error">{error}</div>}
      {registrationErrormessage && <div className="error">{registrationErrormessage}</div>}
      <div className="container">
        <div className="handle">
          <h1 className="h1">Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="text"
              name="username"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
             {nameerror && <div className="error">{nameerror}</div>}
           
            <input
              type="password"
              className="text"
              name="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passworderror && <div className="error">{passworderror}</div>}
            <input
              type="email"
              className="text"
              name="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {emailerror && <div className="error">{emailerror}</div>}
            
            <button
              type="submit"
              className="btn"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
            <button className="btn" onClick={()=>nav("/")}>
            
            Login
          
            </button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default Signup;