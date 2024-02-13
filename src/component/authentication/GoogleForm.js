import '../style/GoogleForm.css';
import googleIcon from '../img/google.png'

export default function Google() {

    return (
        <div className="Component">
            <button className="google">
                <img src={googleIcon} alt="Google Icon" className="google-icon" />
                Sign in with Google
            </button>
            <p className='Or'>Or</p>
        </div>
      
    );
  }