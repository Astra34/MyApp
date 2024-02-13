import Google from './GoogleForm';
import {useNavigate } from 'react-router-dom';
import { useState,useEffect} from 'react';
import '../style/Form.css';
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

export default function Login({setMessageErr, messageErr, formType, actionClick, handleClear, recoverInfo ,values, ShowPrompt}) {
  const navigate = useNavigate();
  const [veiw, setVeiw] = useState(false);
  const [change, setChange] = useState(formType);

  useEffect(() => {
    let timer;
    if (!messageErr.success || messageErr.success) {
      timer = setTimeout(() => {
        setMessageErr({ success: null, message:''});
      }, 3000); 
    }
    return () => {
      clearTimeout(timer);
    };
  }, [messageErr.success, messageErr.message, setMessageErr]);
  
  return (
    <div className='Wrapper_box'>
    <p className={`message ${messageErr.success === null ? '' : messageErr.success ? 'activeSuccessful' : 'activeError'}`}>{messageErr.message}</p> 
    <button className='close' alt="Fermer" onClick= {() => {ShowPrompt(); navigate('/MyApp'); handleClear()}} />
      <>
        {change ? <h1 className="Title">Login to an account</h1> : <h1 className="Title">Create an account</h1>}
        <form className='box'>
          <input type='text' name='email' className={`Input ${messageErr.success === false ? 'activeBorderError' : ''}`} placeholder={change ?'Email or Username': 'Email'} onChange={recoverInfo} value={values.email}/>
          {!change ? <input type='text' name='username' className={`Input ${messageErr.success === false ? 'activeBorderError' : ''}`} placeholder='Username' onChange={recoverInfo} value={values.username}/> : null}
          <input type={veiw ? 'text' : 'password'} name='password' className={`Input ${messageErr.success === false ? 'activeBorderError' : ''}`} placeholder='Password' onChange={recoverInfo} value={values.password}/>
          <button type='button' className='Veiw' onClick={() => {veiw ? setVeiw(false):setVeiw(true)}}>{veiw ? <PiEyeSlashLight/>:<PiEyeLight/>}</button>
          <button type ='button' className='button Login' value='Login' onClick={() => {change ? actionClick('Login') : actionClick('CreateUser')}}>{change ? "Login" : "Signup"}</button>
          {change ? <button type ='button' className='button Forgotten'>Password Forgotten</button> : null}
          {change ? <p className="Text">Don't have an account ?<button type='button' className="LinkButton" onClick={() => {setChange(false) ; handleClear() }}>Register now</button></p> : null}
          {!change ? <p className="Text">You're already registered ?<button type='button' className="LinkButton" onClick={() => {setChange(true) ; handleClear() }}>Login</button></p> : null}
        </form>
      </>
      <Google/>
    </div>
  );
}

