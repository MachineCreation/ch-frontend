import { User } from '../pages/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DropdownContentProps {
  user: User;
  isvisable: boolean;
  DropMenu: () => void;
}



const DropdownContent= (props: DropdownContentProps) => {

        // const [APIkey , setAPIkey] = useState(props.user.APIkey)
        const navigate = useNavigate()
        const [vismodal, setvisModal] = useState(false);
        const token = localStorage.getItem('token');
        // const new_key = {"API_key": APIkey}
        
    
        const ocPopup = async ()=> {
            setvisModal(!vismodal);
        };
    
        const userDelete = async () => {
            const response = await fetch(`https://chbackend-psu2.onrender.com/delete`,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'x-access-token': `Bearer ${token}`
                },
            })
            userDelete();
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            else {
                navigate('/');
            };
            return await response.json()
        }


//   const update = async () => {
//     const response = await fetch(`https://chbackend-psu2.onrender.com/APIkey`,
//     {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'x-access-token': `Bearer ${token}`
//         },
//         body: JSON.stringify(new_key)
//     })
//     ocPopup();
//     if (!response.ok) {
//         throw new Error('Failed to update data on the server');
//     };
//     return await response.json()
// }


  return (
    <div>
        {vismodal ? (
            
                <div className="popup-container">
                    <div className="popup-content inter-font">
                        <h1 className='t-white margin-3'>
                            User name: {props.user.user_name}
                            </h1>
                            {/* <div className="API-form">
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
                            </div> */}
                            <div className='API-form'>
                                <h5>
                                    This site is built to help users visually compare different coins side by side, without the 
                                    thought of price difference but focused on growth.
                                    <br></br>
                                    <br></br>
                                     The main graph shows four coins of users choice 
                                    and their behavior over the last 6 months.
                                    <br></br>
                                    <br></br>
                                    <span className='t-white'>latest update 5-1-2024:</span>
                                    <ul className='feature-list'>
                                        <li>
                                            24hr candle charts for chosen coins.
                                        </li>
                                        <li>
                                            responsive chart line width.
                                        </li>
                                    </ul>
                                    <span className='t-white'>update 4-26-2024:</span>
                                    <ul className='feature-list'>
                                        <li>
                                            A more comprehensive list of coin choices.
                                        </li>
                                        <li>
                                            Better coin list functionality.
                                        </li>
                                    </ul>
                                    <span className='t-white'>still to come:</span>
                                    <ul>
                                        <li>
                                            Graphs coresponding with the users coin choices to show custom time periods
                                        </li>
                                        <li>
                                            Time zone option.
                                        </li>
                                        <li>
                                            "top movers" ticker
                                        </li>
                                        <li>
                                            And more!
                                        </li>
                                     </ul>
                                    <div className="button-box">
                                    <button type='button'
                                        onClick={ocPopup}
                                        id="close-btn" 
                                        className="inter-font-bold">
                                        <span className='btn-span'>
                                            Close
                                            </span>
                                        </button>
                                    <button type='button'
                                        onClick={userDelete}
                                        id="close-btn" 
                                        className="inter-font-bold">
                                        <span className='btn-span'>
                                            Delete Account
                                            </span>
                                        </button>    
                                        
                                    </div>
                                </h5>
                                
                            </div>
                        </div>
                    </div>
        ):(
            <div>
            <div className='dropdown-content'>
              <div className='dropdown-item inter-font' 
                  onClick={ocPopup}>
                    About
                    </div>
              <a className="dropdown-item inter-font" 
                  href="http://Coinbase.com/login" 
                  target="_blank">
                    Coinbase
                      </a>
              <div className='dropdown-item inter-font'>
                    Time Zone
                  </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DropdownContent;
