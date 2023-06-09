
import Register from '../compement/Register'
import Authenticate from '../compement/Authenticate'

const Main = () => {
  


  return (
    <div className='body'>
    <h2 className='titre'>Welcome to Chore Track</h2>
      <div className='container'>
      <Register/>
      <Authenticate />
      </div>
    </div>
  )
}

export default Main