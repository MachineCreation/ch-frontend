import { User } from '../pages/types';
import axios from 'axios';
import { useState } from 'react';
import dropButton from '../images/menu_button.png';

interface DropdownContentProps {
  user: User;
  isvisable: boolean;
  DropMenu: () => void;
}



const DropdownContent= (props: DropdownContentProps) => {

    const [APIkey , setAPIkey] = useState(props.user.APIkey)
    const [vismodal, setvisModal] = useState(false);
    const token = localStorage.getItem('token');

    

    const ocPopup = async ()=> {
        setvisModal(!vismodal)
        let tell = `popup ${vismodal}`
        console.log(tell)
    }

    const APIkeys = async () => {
          
      try{
  
          const response = await fetch(`https://chbackend-psu2.onrender.com/APIkey`,
          {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'access-Control-Allow-Headers': 'x-access-token',
                'x-access-token': `Bearer ${token}`
            },
            Body: JSON.stringify(APIkey)
          });
          console.log(response)
          //window.location.reload();
      }
      catch (error: any) {
          return (error.response)
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
        {vismodal ? (
            
                <div className="popup-container">
                    <div className="popup-content">
                        <h1 className='t-white margin-3
                        '>User profile: {props.user.user_name}</h1>
                            <div className="API-form">
                                <form >
                                <input type="text"
                                    className='sign-log-input'
                                    value={APIkey}
                                    onChange={(e) => setAPIkey(e.target.value)}
                                    placeholder={"API key here"}>
                                        </input>
                                <button type='button'
                                    onClick={APIkeys}
                                    id="submit-btn" 
                                    className="inter-font-bold">
                                    <span className='btn-span'>
                                        Submit
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
        ):(
            <div>
            <div className='dropdown-content'>

              <div className='dropdown-item inter-font'>{props.user.user_name}</div>
              <div className='dropdown-item inter-font' onClick={ocPopup}>Profile</div>
              <a className="dropdown-item inter-font" 
                  href="http://Coinbase.com/login" 
                  target="_blank">
                      Coinbase
                      </a>
              <div className='dropdown-item inter-font'>Time Zone</div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DropdownContent;
