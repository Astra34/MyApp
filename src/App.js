import { useState,useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Form from './component/authentication/Form';
import Profil from './component/pages/Profile';
import Nav from './component/Nav/Nav';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; 

function App() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [formType, setFormType] = useState(true);
  const [authentication , setAuthentication] = useState(null)
  const [success, setSuccess] = useState({ success: null, message: '' })
  const [infoUser, setInfoUser] = useState(null)
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/check-auth`,{},{
          withCredentials: true  
        });

        console.log(response, response.headers, response.headers['set-cookie'],response.data)
        setInfoUser(response.data.info);
        setAuthentication(response.data.success);
      } catch (err) {
        setAuthentication(false);
      }
    };
    checkAuth();
  }, []);
  
  const handleRecoverValue = async (field, value) => {
    setValues(prevValues => ({ 
      ...prevValues,
      [field]: value
    }));
    return {value};
  };

  const handleClear = () => {
    setValues({
      email: '',
      username: '',
      password: ''
    });
  };

  const handleSubmit = async (endpoint) => {
    try {
      const dataToSend = {
        username: values.username || null,
        email: values.email,
        password: values.password
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/${endpoint}`, dataToSend, { 
        withCredentials: true 
      });
      if(endpoint === 'Login'){
        console.log(response.data)
        if (response.data.success) {
          document.cookie = `sessionId=${response.data.sessionId}`;  
          setShowPrompt(false);
          setInfoUser(response.data.info);
          setAuthentication(response.data.success);
          handleClear();
        }
      }else{
        if (response.data.success) {
          console.log(response.data)
          setSuccess({message: response.data.message, success: response.data.success});
          handleClear();
        }
      }
    } catch (error) {
      setSuccess({message: error.response.data.message, success: error.response.data.success});
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/Logout`,{},{
        withCredentials: true  
      });
      if (response.data.success) {
        setInfoUser(null);
        setAuthentication(false);        
      }

    } catch (err) {
      console.error('Erreur lors de la déconnexion :', err);
    }
  };

  const handleRenderForm = () => (
    <Form
      messageErr = {success}
      formType = {formType}
      values = {values}
      handleClear =  {() => handleClear()}
      setMessageErr = {(newMessageErr) => setSuccess(newMessageErr)}
      actionClick = {(endpoint) => handleSubmit(endpoint)}
      recoverInfo = {(e) => handleRecoverValue(e.target.name, e.target.value)}
      ShowPrompt = {() => setShowPrompt(false)}
    />
  );
  
  const handleRenderNav = () => (
    <Nav 
      authentication = {authentication}
      logout = {() => handleLogout()}
      onclick = {() => setShowPrompt(true)}
      onLogin = {() => {setFormType(true); setShowPrompt(true);}}
      onSignup = {() => {setFormType(false); setShowPrompt(true);}}
    />
  );

  const renderProfilePage = () => (
    <>
      {!authentication &&(
        handleRenderForm()
      )}
      {authentication && infoUser && (
        <>
          {handleRenderNav()}
          <Profil 
            infoUser = {infoUser}
          />
        </>
      )}
    </>
  );

  const renderHomePage = () => (
    <>
      {!showPrompt && (
        handleRenderNav()
      )}
      {!authentication && showPrompt && (
        handleRenderForm()
      )}
    </>
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/MyApp" element = {renderHomePage()} />
          <Route path = "/MyApp/profile" element = {renderProfilePage()} />
          <Route path = "*" element={<Navigate to="/MyApp"/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

