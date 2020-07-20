import React, {useContext,useRef,useEffect,useState} from 'react';
import LazyLoad from 'react-lazyload';
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from './App'
import M from 'materialize-css'
import './SearchBar.css';
import axios from 'axios';
import Pagination from './Pagination1';

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

function SearchBar({updateQuery}) {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [value, setValue] = useState("")
    const [results, setResults] = useState([])
    const [item, setItem] = useState([])
    const [iconColor, setIconColor] = useState({bgColor: ""})
    const [url, setUrl] = useState("")
    const [currentImages, setCurrentImages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState("")
    const [totalPages, setTotalPages] = useState(0)
    const [perPage, setPerPage] = useState(5)
    // const [icon, setIcon] = useState(true)
    const images = 6

    // const fetchImages = () => {
    //     fetch(`https://api.unsplash.com/search/photos?client_id=lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok&query=${value}&orientation=squarish&per_page=${totalImages}`)
    //     .then(res => {
    //         console.log(res.headers["x-total"])
    //         res.json()} )
    //     .then(data => {
    //         setResults(data.results)
    //         // setItem(data.results.slice(i, i+5))
    //         setItem(data.results)
    //         // setTotalPages(data.results.)
    //         showImages();
    //     })
    // }

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

    const fetchPhotos = (inputValue, page = 1) => {
        const baseUrl = "https://api.unsplash.com/search/photos";
    const options = {
        headers: {
          Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
        },
        params: {
          query: inputValue,
          page, 
          per_page: perPage
        }
      };

    axios
      .get(baseUrl, options)
      .then(response => {
          setResults(response.data.results)
          setItem(response.data.results)
          showImages()
          setCurrentPage(page)
          setTotalPages(response.headers["x-total"])
          setQuery(inputValue)
      })
      .catch(() => {
        console.log("Error");
    });
    updateQuery(inputValue);
};

    // const handleClick = (event) => {
    //     setCurrentPage(Number(event.target.id))
    //     console.log(currentPage)
    // }

    const colorChange = (url) => {
        if(state){
            setIconColor({bgColor: "#4e54c8"})
            setUrl(url)
        }else {
            console.log("hi")
            M.toast({html: "Please login first", classes: "#d81b60 pink darken-1"})
            history.push('/signin')
        }
        // setIcon(!icon)
    }

    const showImages = () => {
        const indexOfLastImage = currentPage * images;
        const indexOfFirstImage = indexOfLastImage - images;
        setCurrentImages(results.slice(indexOfFirstImage, indexOfLastImage))
    }

    // const next = () => {
    //     // setItem(results.slice(i+5, i+ 11))
    // }

    // const prev = () => {
    //     // setItem(results.slice(i, i+5))
    // }

    return(
        <div className="Search container">
            <div className="search-box input-field">
                <input className="search-input" type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} placeholder="Search..."
                style={{width: "70%", color: "#4e54c8"}}/>
                {/* <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchImages()}>Search</button> */}
                <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchPhotos(`${value}`)}>Search</button>
            </div>
            <div className="gallery">
                {/* {    */}
                    <LazyLoad placeholder={<Loading />}>
                        {
                            currentImages.map((resultImage, index) => {
                                return(
                                    <span key={index}>
                                        <div className="image-divs">
                                            <img className="item animate__animated animate__pulse" key={index} src={resultImage.urls.regular} />
                                            <i className="material-icons like-btn" onClick={()=> colorChange(resultImage.urls.regular)}>favorite_border</i>
                                        </div>
                                    </span>
                                )
                            })
                            // item.map((item1) => {
                            //     return(
                            //         <span key={item1.id}>
                            //             <div className="image-divs">
                            //                 <img className="item animate__animated animate__pulse" key={item1.id} src={item1.urls.regular} />
                            //                 <i className="material-icons like-btn" onClick={()=> colorChange(item1.urls.regular)}>favorite_border</i>
                            //             </div>
                            //         </span>
                            //     )  
                            // })
                        }
                    </LazyLoad>
                {/* } */}
                
            </div>

            <Pagination
                current={currentPage}
                total={totalPages}
                perPage={perPage}
                query={query}
                onPageChanged={page => fetchPhotos(query, page)}
            />

            {/* <div className="slide-btns-div">
                <ul className="pagination-bar">
                    {
                        pageNumber.map(index => {
                            return(
                                <li id={index+1} onClick={(e) => handleClick(e)}>{index}</li>
                            )
                        })
                    }
                </ul>
                <button className="btn waves-effect waves-light slide-btn" onClick={prev}>
                    <i className="material-icons">first_page</i>
                </button>
                <button className="btn waves-effect waves-light" onClick={next}>
                    <i className="material-icons">last_page</i>
                </button>
            </div> */}
        </div>
    )
}

export default SearchBar;