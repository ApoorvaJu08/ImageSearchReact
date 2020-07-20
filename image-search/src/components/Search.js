import React, {useContext,useEffect,useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom'
import {UserContext} from './App'
import M from 'materialize-css'
import './SearchBar.css';
import axios from 'axios';
import ImageList from './ImageList';

function SearchBar({updateQuery}) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState("")
    const [value, setValue] = useState("")
    const [imagesPerPage, setimagesPerPage] = useState(16)
    const [totalPages, setTotalPages] = useState(0)

    const fetchPhotos = (inputValue, page = 1) => {
        const baseUrl = "https://api.unsplash.com/search/photos";
        const options = {
            headers: {
                Authorization: `Client-ID lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok`
            },
            params: {
                query: inputValue,
                page, 
                per_page: imagesPerPage
            }
        };

        axios
        .get(baseUrl, options)
        .then(response => {
            setQuery(inputValue)
            setImages(response.data.results)
            setLoading(false)
            setTotalPages(response.headers["x-total"])
        })
        .catch((err) => {
            console.log(err);
        });
        updateQuery(inputValue);
    };

    return(
        <div className="Search">
            <div className="search-box input-field">
                <input className="search-input" type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} placeholder="Search..."
                style={{width: "70%", color: "#4e54c8"}}/>
                <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchPhotos(`${value}`)}>Search</button>
            </div>
            <ImageList images = {images} loading = {loading} />

        </div>
    )
}

export default SearchBar;