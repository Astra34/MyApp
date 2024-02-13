import '../style/Nav.css';

import { BsFillHouseFill,BsCart3,BsPersonFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Nav({authentication, logout, onLogin, onSignup}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="Box">
                <div className='Logo'>
                    <h1 className='logo'>Logo</h1>
                </div>

                <div className='Nav'>
                    <>
                        <span className='icon home'><BsFillHouseFill/></span>
                        <button className='Nav-btn' onClick={() => navigate('/MyApp')}>Home</button>
                    </>
                    <>
                        <span className='icon shop'><BsCart3/></span>
                        <button className='Nav-btn'>Boutique</button>
                    </>
                    <>
                        <span className='icon ab'><AiFillQuestionCircle/></span>
                        <button className='Nav-btn'>Aboute</button>
                    </>
                    <>  
                        <span className='icon profil'><BsPersonFill/></span>
                        <button className='Nav-btn' onClick={() => navigate('/profile')}>Profil</button>
                    </>            
                </div>
                <div className='Auth'>
                    {
                        authentication ? (
                            <button className='Auth-btn' onClick= {logout}>Logout</button>
                        ) : (
                            <>
                                <button className='Auth-btn' onClick= {onLogin}>Login</button>
                                <button className='Auth-btn' onClick= {onSignup}>Signup</button>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
  }