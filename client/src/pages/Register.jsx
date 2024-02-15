import React from "react";
import{Link} from "react-router-dom"
import "./Register.scss"

function Register(){
    return(
        <div className="auth">
            <div className="regis-auth-container">
                <form>
                    <h1>Register</h1>
                    <input type="text" placeholder="Username" required/><i className='bx bxs-user regi-icon1' ></i>
                    <input type="text" placeholder="Email ID" required/><i className='bx bxs-user regi-icon2' ></i>
                    <input type="password" placeholder="Password" required/><i className='bx bxs-lock-alt regi-icon3'></i>
                    <p>This is an error!!</p>
                    <button type="submit">Login</button>
                    <div className="linkto">
                        <label>Already have an account? </label><Link to="/login">Login</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;