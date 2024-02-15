import React from "react"
import {Link} from "react-router-dom"
import "./Login.scss"

function Login(){
    return(
        <div className="auth">
            <div className="auth-container">
                <form>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" required/><i className='bx bxs-user' ></i>
                    <input type="password" placeholder="Password" required/><i className='bx bxs-lock-alt sec'></i>
                    <p>This is an error!!</p>
                    <button type="submit">Login</button>
                    <div className="linkto">
                        <label>Don't have an account? </label><Link to="/register">Register</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;