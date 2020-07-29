import React, {useState} from 'react';
import './SearchBar.css';
import axios from 'axios';
import ImageList from './ImageList';
import Pagination from "react-js-pagination";

function SearchBar({updateQuery}) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(null)
    const [query, setQuery] = useState("")
    const [value, setValue] = useState("")
    const [imagesPerPage, setimagesPerPage] = useState(16)
    const [totalPages, setTotalPages] = useState(0)

    const fetchPhotos = (inputValue, page) => {
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        fetchPhotos(`${value}`, pageNumber)   
    }

    return(
        <div className="Search">
            <div className="search-box input-field">
                <input className="search-input" type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} placeholder="Search..."
                style={{width: "70%", color: "#4e54c8"}}/>
                <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchPhotos(`${value}`)}>Search</button>
            </div>
            <ImageList images = {images} loading = {loading} />
            { totalPages > 0 ? <Pagination
                prevPageText='prev'
                nextPageText='next'
                firstPageText='first'
                lastPageText='last'
                activePage={currentPage}
                itemsCountPerPage={imagesPerPage}
                totalItemsCount={totalPages}
                onChange={(page) => handlePageChange(page)}
                /> : ""  }
        </div>
    )
}

export default SearchBar;