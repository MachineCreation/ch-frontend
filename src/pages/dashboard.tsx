import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from "./types"
import logo from '../images/Crypto-hindsight-logo.png';
import dropButton from '../images/menu_button.png'



function dashboard() {


  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  const [isvisable, setisVisable] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/@me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          navigate('/');
        } else {
          // Handle other errors
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchData();
  }, []);

  const DropMenu = async ()=> {
      setisVisable(!isvisable)
      console.log(isvisable)
  }

  const openPopup = async ()=> {
    
  }

  const APIkey = async () => {
        
    try{

        await axios.put(`http://127.0.0.1:5000/API_key`,
        {
        //API_key,
        });

        //window.location.reload();
    }
    catch (error: any) {
        if (error.response.status === 401) {
            alert("Unauthorized, no current user found")
          }
    }
};

  const grafChange = async () => {

    try{

        await axios.put(`http://127.0.0.1:5000/create`,
        {
            //red,
            //blue,
           // green,
           // yellow,
        });

        //window.location.reload();
    }
    catch (error:any) {
        console.log(error)
    }
}


  return (
    <div>
      <div className='t-white'>l</div>
      { user != null ? 
      (
        <div>
          <div className="main-container">
          <div className="nav-header">
        <div className="crypto-hindsight-logo-box">
          <img className='logo' src={logo}></img>
        </div>
          <div onClick={DropMenu} className="menu-button">
            <img  src={dropButton}></img>
          </div>
          { !isvisable ?
           (
            <></>
           ):(
              <div onClick={DropMenu} className='close-aux-menu'>
                           
              <div className="dropdown-content">
                <div  className="dropdown-item inter-font">Profile</div>
                <a className="dropdown-item inter-font" href="http://Coinbase.com/login" target="_blank">Coinbase</a>
                <div className="dropdown-item inter-font">Time Zone</div>
              </div>
              </div>
           )
            }
          
      </div>
          </div>
        </div>
      ):(
        <></>
      )}
    </div>
  )
}

export default dashboard