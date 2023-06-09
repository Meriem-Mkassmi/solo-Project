import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [job, setJob] = useState([]);
  const [connectedUserJob, setConnectedUserJob] = useState([]);
  const [user, setUser] = useState();
  const [refrech, setRefrech] = useState(false);

  const getConnectedUser = () => {
    const connectedUser = localStorage.getItem('user');
    console.log({ connectedUser });
    if (!connectedUser) {
      console.log("Error creating ");
    }
    const parsedUser = JSON.parse(connectedUser);
    console.log({ parsedUser })
    return parsedUser;
  }

  useEffect(() => {
    setUser(getConnectedUser());

    axios.get("http://localhost:5000/api/job")
      .then(response => {
        setJob(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`http://localhost:5000/api/users/${getConnectedUser()._id}`)
      .then(response => {
        setConnectedUserJob(response.data.jobs);
        console.log("userrr");
        console.log(response.data.jobs);
      })
      .catch(error => {
        console.error(error);
      });
  }, [refrech]);

  const handleAddJobToUser = (job) => {
    const jobToUser = { jobId: job._id, userId: getConnectedUser()._id }
    axios.post(`http://localhost:5000/api/users/`, jobToUser)
      .then(response => {
        setRefrech(true)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleCancelJob = (job) => {
    axios.delete(`http://localhost:5000/api/job/${job._id}`)
      .then(response => {
        setRefrech(true)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleDoneJobUser = (job) => {
    const jobToUser = { jobId: job._id, userId: getConnectedUser()._id }
    axios.delete(`http://localhost:5000/api/users/`, jobToUser)
      .then(response => {
        setRefrech(true)
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div >
      <div className='lo'>
      <div >
        {(!!user) ? <h2 className='dis'>Welcome {user.firstName} !</h2> : <p>Error no connected user</p>}
        <Link to={'/'} className='di'>Logout</Link>
      </div>
      <div className='diss'>
        <Link to={'/addJob'}>Add a Job</Link>
      </div>
      </div>
      <div className='dash'>
        <div >

          <table className='table'>
            {/* <thead className='row'>
              <tr >
                <th className='cel'>Job Title</th>
                <th className='cel'>Location</th>
                <th className='cel'>Action</th>
              </tr>
            </thead> */}
            <tbody className='row'>
            
            
                <td className='cel'>Job Title</td>
                <td className='cel1'>Location</td>
                <td className='cel2'>Action</td>
            
              {job.map(job => (
                <tr key={job._id} >
                  <td className='cell' >{job.title}</td>
                  <td className='cell'>{job.location}</td>
                  <div className='cell'>
                  <td>
                    <Link to={`/view/${job._id}`}>View</Link>
                  </td>
                  <td>
                    <Link onClick={() => handleAddJobToUser(job)}>add</Link>
                  </td>
                  {!!(job.createdBy) ?
                    <>
                      {(job.createdBy._id === getConnectedUser()._id) ?
                        <>                   <td>
                          <Link to={`/edit/${job._id}`}>edit</Link>
                        </td>
                          <td>
                            <Link onClick={() => handleCancelJob(job)}>cancel</Link>
                          </td></>
                        : <td></td>}

                    </>
                    : <>
                    </>
                  }
                 </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th className='cell3'> My Jobs ..</th>
              </tr>
            </thead>
            <tbody className='cell'>
              {!!(connectedUserJob) ?
                <>{connectedUserJob.map(job => (
                  <tr key={job._id}>
                    <td >{job.title}</td>
                    <div >
                    <td>
                      <Link to={`/view/${job._id}`}>View</Link>
                    </td>
                    <td>
                      <Link onClick={() => handleCancelJob(job)}>Done</Link>
                    </td>
                    </div>
                  </tr>
                ))}</>
                : <></>}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
