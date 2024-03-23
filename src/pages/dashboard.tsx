import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from "./types"
import logo from '../images/Crypto-hindsight-logo.png';
import dropButton from '../images/menu_button.png';
import DropdownContent from '../components/drop-menu';



function dashboard() {


  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  const [isvisable, setisVisable] = useState(false)
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chbackend-psu2.onrender.com/@me`, {
        headers:  
        {
            "x-access-token": `Bearer ${token}`
          }
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

  


  return (
    <div>
      <div className='t-white'></div>
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
              <div className='close-aux-menu'>                           
                <DropdownContent 
                user={user}
                isvisable = {isvisable}
                DropMenu = {DropMenu}
                 />
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