import "./login-page.css"

function Loginpage(){
    return(
        <div className="login-container">
            <h2>LOGIN</h2>
            <div className="username-inpbox inpbox">
                <input type="text" placeholder="Username" required></input><i class='bx bxs-user' ></i>
            </div>
            <div className="password-inpbox inpbox">
                <input type="password" placeholder="Password" required></input><i class='bx bxs-lock-alt'></i>
            </div>
            <div className="submit-btnbox">
                <button className="submit-btn" type="submit">Login</button>
            </div>  
            <div className="signup-link">
                <label>Don't have an account? </label><a href="#">Sign Up</a>
            </div>
        </div>
    )
}

export default Loginpage