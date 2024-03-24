import { User } from '../pages/types';
import { useState } from 'react';

interface DropdownContentProps {
  user: User;
  isvisable: boolean;
  DropMenu: () => void;
}



const DropdownContent= (props: DropdownContentProps) => {

    const [APIkey , setAPIkey] = useState(props.user.APIkey)
    const [vismodal, setvisModal] = useState(false);
    const token = localStorage.getItem('token');
    const new_key = {"API_key": APIkey}
    

    const ocPopup = async ()=> {
        setvisModal(!vismodal);
    };




  const update = async () => {
    const response = await fetch(`https://chbackend-psu2.onrender.com/APIkey`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': `Bearer ${token}`
        },
        body: JSON.stringify(new_key)
    })
    ocPopup();
    if (!response.ok) {
        throw new Error('Failed to update data on the server');
    };
    return await response.json()
}


  return (
    <div>
        {vismodal ? (
            
                <div className="popup-container">
                    <div className="popup-content inter-font">
                        <h1 className='t-white margin-3'>
                            User name: {props.user.user_name}
                            </h1>
                            <div className="API-form">
                                <form >
                                <label htmlFor="APIkey"> API Key</label>
                                <input type="text"
                                    name='APIkey'
                                    className='sign-log-input'
                                    value={APIkey}
                                    onChange={(e) => setAPIkey(e.target.value)}
                                    placeholder={`${APIkey}`}>
                                        </input>
                                <div className='button-box'>
                                    <button type='button'
                                        onClick={update}
                                        id="submit-btn" 
                                        className="inter-font-bold">
                                        <span className='btn-span'>
                                            Submit
                                            </span>
                                        </button>
                                    <button type='button'
                                        onClick={ocPopup}
                                        id="close-btn" 
                                        className="inter-font-bold">
                                        <span className='btn-span'>
                                            Close
                                            </span>
                                        </button>

                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
        ):(
            <div>
            <div className='dropdown-content'>
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
