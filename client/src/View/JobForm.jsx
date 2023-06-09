import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState([]);
  const [refrechstate, setRefrech] = useState(false)
  const refrech = () => { setRefrech(!refrechstate) }
  const navigate = useNavigate();

  const getConnectedUser = () => {
    const connectedUser = localStorage.getItem('user');
    console.log({ connectedUser });
    if (!connectedUser) {
      const errObj = {};
      errObj["connectedUser"] = "there is not connected user"
      console.log("Error creating ");
      setErrors(errObj);
    }
    const parsedUser = JSON.parse(connectedUser);
    console.log({ parsedUser })
    return parsedUser;
  }
  const handleCreateJob = (e) => {
    e.preventDefault();
    // Create job object
    const newJob = {
      title,
      description,
      location,
      isAvailable: true,
      createdBy: getConnectedUser()._id
    };
    console.log({ newJob });
    // Send a POST request to the server to create a new job
    axios.post('http://localhost:5000/api/job', newJob)
      .then(response => {

        console.log(response.data);
        refrech();
        setDescription('');
        setLocation('');
        setTitle('');
        console.log("xxxxxxxxx ");
        navigate('/dashboard')
      })
      .catch(err => {
        console.log("************", err.response.data.errors);
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
    <div>
      <div className='log'>
        <>
          <h3 className='edi'>Add a  Job</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </>
        <div className='espace'>
          <Link to={'/dashboard'} className='L'>Back</Link> &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={'/'} className='L'>Logout</Link>
        </div>
      </div>
      <form onSubmit={(e) => handleCreateJob(e)} className='P'>
        <div>
          <label>Title</label>
          <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
          <p>{errors.title}</p>
        </div>
        <div>
          <label>Description</label>
          <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
          <p>{errors.description}</p>
        </div>
        <div>
          <label>Location</label>
          <input type="text" placeholder="Location" onChange={e => setLocation(e.target.value)} />
          <p>{errors.location}</p>
        </div>
        <button className='button'>Submit</button>
      </form>
    </div>

  );
};

export default JobForm;
