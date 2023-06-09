import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [refrechstate, setRefrech] = useState(false)
    const refrech = () => { setRefrech(!refrechstate) }

    const handleRegister = (e) => {
        e.preventDefault();
        // Perform client-side validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Create user object
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        };

       
        axios.post('http://localhost:5000/api/register', newUser)
            .then(response => {
               
                console.log(response.data); 
                setConfirmPassword('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
                refrech();
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
            <h3>Register</h3>
            <form onSubmit={handleRegister}>
                <div>
                    <label>First Name:</label>&nbsp;&nbsp;
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <p>{errors.firstName}</p>
                </div>
                <div>
                    <label>Last Name:</label>&nbsp;&nbsp;
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />

                    <p>{errors.lastName}</p>
                </div>
                <div>
                    <label>Email:</label>&nbsp;&nbsp;

                    <input type="email" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)} />
                    <p>{errors.email}</p>
                </div>
                <div>
                    <label>Password:</label>&nbsp;&nbsp;
                    <input type="password" placeholder="Password" value={password}  onChange={e => setPassword(e.target.value)} />
                    <p>{errors.password}</p>
                </div>
                <div>
                    <label>confirmPassword</label>&nbsp;&nbsp;

                    <input type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <p>{errors.confirmPassword}</p>
                </div>
                <button className='button'>Register</button>
            </form>
        </div>
    );
};

export default Register;
