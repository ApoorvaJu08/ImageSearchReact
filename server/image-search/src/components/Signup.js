import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
    const history = useHistory() 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
        return
      }
      fetch("/signup",{
        method:"post",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name,
          password,
          email
        })
      }).then(res => res.json())
      .then(data => {
        if(data.error){
          M.toast({html: data.error, classes: "#d81b60 pink darken-1"})
        }
        else{
          M.toast ({html: data.message, classes: "#004d40 teal darken-4"})
          history.push('/signin')
        }
      }).catch(err => {
        console.log(err)
      })
    }

    return(
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2 className="form-heading">Sign Up</h2>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light btn-beneath-input" onClick={() => PostData()}>
                Sign Up
            </button>
            <h5>
              <Link to="/signin">Already have an account?</Link>
            </h5>
        </div>
      </div>
    )
}

export default SignUp