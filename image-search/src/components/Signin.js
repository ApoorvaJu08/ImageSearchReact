import React from 'react'

const SignIn = () => {
    return(
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2 className="form-heading">Login</h2>
            <input
            type="text"
            placeholder="email"
            />
            <input
            type="password"
            placeholder="password"
            />
            <button className="btn waves-effect waves-light btn-beneath-input">
                Login
            </button>
        </div>
      </div>
    )
}

export default SignIn