
import './App.css';
import Main from './View/Main';
import {Routes,Route} from 'react-router-dom';
import JobForm from './View/JobForm';
import Dashboard from './View/Dashboard'
import EditJob from './View/EditJob';
import JobDetails from './View/JobDetails';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/addJob' element={<JobForm/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/edit/:id' element={<EditJob/>}/>
        <Route path='/view/:id' element={<JobDetails />}/>
        

      </Routes>
    </div>
  );
}

export default App;
