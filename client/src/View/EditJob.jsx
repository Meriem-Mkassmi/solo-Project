import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description,setDescription]=useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const getConnectedUser = () => {
    const connectedUser =  localStorage.getItem('user');
    console.log({connectedUser});
    if(!connectedUser) {
      const errObj = {};
      errObj["connectedUser"] = "there is not connected user"
      console.log("Error creating ");
      setErrors(errObj);
    }
    const parsedUser =  JSON.parse(connectedUser);
    console.log({parsedUser})
    return parsedUser;
  } 

  useEffect(() => {
    // Fetch the job data from the server
    axios.get(`http://localhost:5000/api/job/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setLocation(response.data.location);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedJob = {
      title,
      location,
      description,
      createdBy : getConnectedUser()._id
    };

    // Send the updated job data to the server
    axios.put(`http://localhost:5000/api/job/${id}`, updatedJob)
      .then(response => {
        console.log('Job updated successfully');
        // Navigate back to the dashboard
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
      <div className='log'> 
            <>
      <h2 className='edii'>Edit your Job Posting </h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </>
      <div className='espace'>
      <Link to ={'/dashboard'} className='L'>Back</Link> &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to ={'/'} className='L'>Logout</Link>
      </div>
      </div>
      <form onSubmit={handleSubmit} className='P'>
        <div>
          <label htmlFor="title">Title</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" id="title" value={title} onChange={handleTitleChange} /> 
          <p>{errors.title}</p>
        </div>
        <div>
          <label htmlFor="description">Description</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
          <p>{errors.description}</p>
        </div>
        <div>
          <label htmlFor="location">Location</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" id="location" value={location} onChange={handleLocationChange} />
          
          <p>{errors.location}</p>
        </div>
        
        <div>
          <button type="submit" className='button'>Submit</button>
        
        </div>
      </form>
    </div>
  );
};

export default EditJob;
