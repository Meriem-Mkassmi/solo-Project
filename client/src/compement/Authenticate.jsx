import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleAuthenticate = (e) => {
    e.preventDefault();
   

    // Create credentials object
    const credentials = {
      email,
      password
    };

    // Send a POST request to the server to authenticate the user
    axios.post('http://localhost:5000/api/authenticate', credentials)
      .then(response => {
        console.log("aaaaa");
        console.log(response.data);

        setEmail('');

        setPassword('');
      //  refrech();
        
        // Store the user information in local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
         navigate('/dashboard');

      })
      .catch(err => {
        console.log("************",err.response.data.errors);
        const errResponse = err.response.data.errors
        const errObj = {};
            for (const key of Object.keys(errResponse)) {
              errObj[key] = errResponse[key].message
            }
            console.log(err.res)
            setErrors(errObj);
              console.log("Error creating ");
          });
  };


  return (
    <div >
      <h3>Login</h3>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <form onSubmit={handleAuthenticate}>
      <div>
        <label>Email:</label>&nbsp;&nbsp;

        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <p>{errors.email}</p>
      </div>
      <div>
        <label>Password:</label> &nbsp;&nbsp;
        <input type="password" placeholder="Password" value={password}  onChange={e => setPassword(e.target.value)} />
        <p>{errors.password}</p>
      </div>
      <button className='button'>Log In</button>
      </form>
    </div>

  );
};

export default Authenticate;
