import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function landing_page() {
    const navigate = useNavigate()
    const [registered, setRegUse] = useState(false);
    const [email, setEmail] =useState<string>('');
    const [user_name, setUser_name] =useState<string>('');
    const [password, setPassword] =useState<string>('');


    const changeModal = () => {
        setRegUse(!registered)
    }


    const Login = async () => {
        try {
          const response = await axios.post('https://chbackend-psu2.onrender.com/signin', 
            { 
              user_name,
              password
            });
          const token = response.data.token;
          localStorage.setItem('token', token);                 // Store token in localStorage

          navigate('/dashboard')                                // Navigate to dashboard

        } catch (error) {
          console.error('Login failed:', error);
        }
      };


    const register = async () => {
      
      try{
        await axios.post(`https://chbackend-psu2.onrender.com/register`,
        {
            email,
            password,
            user_name,
        });

        window.location.reload();

        }
      catch (error:any) {
        if (error.response.status === 409) {
          alert("User name or Email already in use")
        }
        if (error.response.status === 411) {
          alert("All fields must be filled")
        }
      }
    };
    

  return  (
    
    <div className="popup-container inter-font">
      <div className="modal-content">
        { registered ? (
            <div>
              <h1 className='t-white margin-2'>Register Your new account</h1>
              <h5 className='t-cyan margin-2'>or</h5>
            <button 
                  className='button inter-font-bold register-log-btn'
                  onClick={changeModal}>                                         
                  <span className='btn-span'>
                    login
                      </span>
              </button>

            <form className='user-info-form'>
              <input type="email"
                  className='sign-log-input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'>
                    </input>

              <input type="password"
                  className='sign-log-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'>
                    </input>
              
              <input type="text"
                  className='sign-log-input'
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  placeholder='User name'>
                    </input>

              <div>
                <h4 className='t-cyan margin-2'>This sight is powered by Coinbase API learn more at <a href='https:\\coinbase.com' target='blank'>coinbase.com</a></h4>
              <button type='button'
                  onClick={register}
                  id="submit-btn" 
                  className="inter-font-bold">
                  <span className='btn-span'>
                    Submit
                    </span>
                </button>
              </div>

            </form>
          </div>
            ):(
          <div>
              <h2 className='t-white margin-2'>Time to login!</h2>
                <h5 className='t-cyan margin-2'> Not a user yet?</h5>
                  <button className='inter-font-bold register-log-btn'
                          onClick={changeModal}>
                          <span className='btn-span'>
                            Register!
                            </span>
                    </button>

            <form className='user-info-form'>
                <input type="text"
                  className='sign-log-input'
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  placeholder='User name'>
                    </input>

                <input type="password"
                  className='sign-log-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'>
                    </input>

                <div>
                <button type='button'
                        onClick={Login}
                        id="submit-btn" 
                        className="inter-font-bold">
                        <span className='btn-span'>
                          Submit
                          </span>
                  </button>
                </div>
            </form>
          </div>
          )}
      </div>
    </div>
  )
}

export default landing_page