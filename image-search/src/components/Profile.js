import React, {useEffect, useState, useContext} from 'react'
import './Profile.css'
import {UserContext} from './App'

const Profile = () => {
    const [images, setImages] = useState([])
    const {state, dispatch} = useContext(UserContext)
    // const history = useHistory() 
    // console.log(state["name"])
    useEffect(()=>{
        fetch('/myimage',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setImages(result.myimage)
        })
     },[])
    return(
        <div className="my-card">
            <div className="card profile-card">
                <h4>Hello {state? state.name: "loading"}</h4>
                <div className="gallery">
                {
                   images.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.url} alt={item.title}/>  
                       )
                   })
                }
                </div>
            </div>
        </div>
    )
}

export default Profile