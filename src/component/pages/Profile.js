import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Profil.css';

export default function Profil({ infoUser }) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(infoUser);
  const [initialValue, setInitialValue] = useState(infoUser);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isDifferent = JSON.stringify(inputValue) !== JSON.stringify(infoUser);
    setHasChanges(isDifferent);
  }, [inputValue, infoUser]);

  const handleEdit = () => {
    if (isEditable) {
      setInputValue(initialValue);
    } else {
      setInitialValue(inputValue);
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (hasChanges) {
      const response = await axios.post('http://172.20.10.3:5000/Api/edit',{},{
          withCredentials: true  
        });
        if (response.data.success) {
          console.log('Informations enregistrées avec succès', response.data);
          setInitialValue(inputValue);
        }
    }
    setIsEditable(false);
  };

  return (
    <div className='boxProfil'>
      <h1 className="titleProfil">Profil de : {inputValue.Email}</h1>
      <div className='infoProfil'>
        <>
          <label className='titleInfo'>Email</label>
          <input type='text' name='email' value={inputValue.Email} readOnly={!isEditable} onChange={handleChange} />
        </> 
        <>
          <label className='titleInfo'>Username</label>
          <input type='text' name='username' value={inputValue.User} readOnly={!isEditable} onChange={handleChange} />
        </>
        <button onClick={handleEdit}>{isEditable ? 'annuler' : 'Edit'}</button>
        {isEditable && (
          <button onClick={handleSave} disabled={!hasChanges}>Enregistrer</button>
        )}
      </div>
    </div>
  );  
}
