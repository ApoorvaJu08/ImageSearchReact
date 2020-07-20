import React, {useContext,useRef,useEffect,useState, useCallback} from 'react';
import LazyLoad from 'react-lazyload';
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from './App'
import M from 'materialize-css'
import './SearchBar.css';
import axios from 'axios';
// import ImageList from './ImageList';
import Pagination from './Pagination';

const LoadingImages = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

function SearchBar({updateQuery}) {
    const {state} = useContext(UserContext)
    const history = useHistory()
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState("")
    const [value, setValue] = useState("")
    const [imagesPerPage, setimagesPerPage] = useState(16)
    const [totalPages, setTotalPages] = useState(0)
    const [iconColor, setIconColor] = useState({bgColor: ""})
    const [url, setUrl] = useState("")

    // if(loading){
    //     return <h1>Loading</h1>
    // }

    const colorChange = (url) => {
        if(state){
            setIconColor({bgColor: "#4e54c8"})
            setUrl(url)
        }else {
            M.toast({html: "Please login first", classes: "#d81b60 pink darken-1"})
            history.push("/signin")
        }
    }

    const fetchPhotos = async(inputValue, page = 1) => {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
                headers: {
                    Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
                },
                params: {
                    query: inputValue,
                    page, 
                    per_page: imagesPerPage
                }
            }
        )
        .then(response => {
            setQuery(inputValue)
            setImages(response.data.results)
            setLoading(false)
            setTotalPages(response.headers["x-total"])
        })
        .catch(() => {
            console.log("Error");
        });
        updateQuery(inputValue)
    };

    // useEffect(() => {
    //     const fetchPhotos = async(inputValue, page = 1) => {
    //         const response = await axios.get("https://api.unsplash.com/search/photos", {
    //                 headers: {
    //                     Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
    //                 },
    //                 params: {
    //                     query: `${value}`,
    //                     page, 
    //                     per_page: imagesPerPage
    //                 }
    //             }
    //         )
    //         .then(response => {
    //             // setQuery(inputValue)
    //             setImages(response.data.results)
    //             // setResults(response.data.results)
    //             // setItem(response.data.results)
    //             setLoading(false)
    //             setTotalPages(response.headers["x-total"])
                
    //         })
    //         .catch(() => {
    //             console.log("Error");
    //         });
    //         updateQuery(inputValue)
    //     };

    //     // fetchPhotos();
    // }, []);

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
        console.log(currentPage)
    } 

    // const fetchPhotos = useCallback(async(inputValue, page = 1) => {
    //     // const baseUrl = "https://api.unsplash.com/search/photos";
    //     // const options = {
    //     //     headers: {
    //     //         Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
    //     //     },
    //     //     params: {
    //     //         query: inputValue,
    //     //         page, 
    //     //         per_page: imagesPerPage
    //     //     }
    //     // };
    //     const response = await axios.get("https://api.unsplash.com/search/photos", {
    //             headers: {
    //                 Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
    //             },
    //             params: {
    //                 query: `${value}`,
    //                 page, 
    //                 per_page: imagesPerPage
    //             }
    //         }
    //     )
    //     .then(response => {
    //         // setQuery(inputValue)
    //         setImages(response.data.results)
    //         // setResults(response.data.results)
    //         // setItem(response.data.results)
    //         setLoading(false)
    //         setTotalPages(response.headers["x-total"])
            
    //     })
    //     .catch(() => {
    //         console.log("Error");
    //     });
    //     updateQuery(inputValue)
    // }, [paginate]);


    return(
        <div className="Search">
            <div className="search-box input-field">
                <input className="search-input" type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} placeholder="Search..."
                style={{width: "70%", color: "#4e54c8"}}/>
                <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchPhotos(`${value}`)}>Search</button>
                {/* <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchImages()}>Search</button> */}
            </div>
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
            {/* <Pagination imagesPerPage = {imagesPerPage} totalPages = {totalPages} /> */}
        </div>
    )
}

export default SearchBar;