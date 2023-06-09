import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link ,useNavigate} from 'react-router-dom'

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the job details from the server
    axios.get(`http://localhost:5000/api/job/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddJobToUser = (job) => {
    const jobToUser = { jobId: job._id, userId: getConnectedUser()._id }
    axios.post(`http://localhost:5000/api/users/`, jobToUser)
      .then(response => { navigate('/dashboard')
      })
      .catch(error => {
        console.error(error);
      });
  }
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

  return (
    <div className='body_container'>
      <div className='log'>

        <div className='espace'>
          <Link to={'/dashboard'} className='L'>Back</Link> &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={'/'} className='L'>Logout</Link>
        </div>
      </div>

      {!!(loading)
        ? <div>Loading job details...</div>
        : <div >
          {!!(job) ?
            <div>
              
                <p className='T'>{job.title}</p>
                <div className='detail'>
                <p>
                  <strong></strong> {job.description}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>


                {!!(job.createdBy)
                  ?
                  <p>
                    <strong>Posted by:</strong> {job.createdBy.firstName} {job.createdBy.lastName}
                  </p>
                  : <p>
                    <strong>Posted by:</strong>

                  </p>}
                <p>
                  <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>
              <Link onClick={() => handleAddJobToUser(job)} className='addto'>Add To My Jobs </Link>
            </div>
            : <div>Job not found.</div>
          }
        </div>
      }

    </div>
  );
};

export default JobDetails;
