import "./signup-front.css"
import {Link} from "react-router-dom"

function signUp(){
    return (
        <div className="signup-container">
            <h2>SIGN UP</h2>
            <div className="username-inpbox inpbox">
                <input type="text" placeholder="Username" required></input><i class='bx bxs-user' ></i>
            </div>
            <div className="password-inpbox inpbox">
                <input type="password" placeholder="Password" required></input><i class='bx bxs-lock-alt'></i>
            </div>
            <div className="confirmpswd-inpbox inpbox">
                <input type="password" placeholder="Confirm Password" required></input><i class='bx bxs-lock-alt'></i>
            </div>
            <div className="submit-btnbox">
                <button className="submit-btn" type="submit">Login</button>
            </div>  
            <div className="login-link">
                <label>Already have an account? </label><Link to = "/Login" className="login-a">Login</Link>
            </div>
        </div>
    )
}

export default signUp;