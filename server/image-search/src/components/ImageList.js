import React, {useContext, useState, useEffect} from 'react';
import './ImageList.css';
import LazyLoad from 'react-lazyload';
import {useHistory} from 'react-router-dom'
import {UserContext} from './App'
import M from 'materialize-css';
import Spinner from './Loader';

const LoadingImages = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

const ImageList = ({images, loading}) => {
    const {state} = useContext(UserContext)
    const history = useHistory()
    const [iconColor, setIconColor] = useState({bgColor: ""})
    const [url, setUrl] = useState("")

    useEffect(()=>{
        if(url){
            fetch("/addImage",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html:"Added Image Successfully",classes:"#43a047 green darken-1"})
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    if(loading){
        return <Spinner />
    }

    const colorChange = (url) => {
        if(state){
            setIconColor({bgColor: "#4e54c8"})
            setUrl(url)
        }else {
            M.toast({html: "Please login first", classes: "#d81b60 pink darken-1"})
            history.push("/signin")
        }
    }

    return(
        <div className="gallery">
            <LazyLoad placeholder={<LoadingImages />}>
                {
                    images.map((resultImage, index) => {
                        return(
                            <span key={index}>
                                <div className="image-divs">
                                    <img className="itemImage animate__animated animate__pulse" key={index} src={resultImage.urls.regular} />
                                    <i className="material-icons like-btn" onClick={()=> colorChange(resultImage.urls.regular)}>favorite_border</i>
                                </div>
                            </span>
                        )
                    })
                }
            </LazyLoad>
        </div>
    )
}

export default ImageList;