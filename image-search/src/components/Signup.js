import React from 'react'

const SignUp = () => {
    return(
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2 className="form-heading">Sign Up</h2>
            <input
            type="text"
            placeholder="Name"
            />
            <input
            type="text"
            placeholder="email"
            />
            <input
            type="password"
            placeholder="password"
            />
            <button className="btn waves-effect waves-light btn-beneath-input">
                Sign Up
            </button>
        </div>
      </div>
    )
}

export default SignUp