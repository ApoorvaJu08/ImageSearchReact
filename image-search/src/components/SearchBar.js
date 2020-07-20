import React, {useState} from 'react';
import './SearchBar.css';
import axios from 'axios';
import ImageList from './ImageList';
// import Pagination from './Pagination';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

function SearchBar({updateQuery}) {
    const [images, setImages] = useState([])
    const [currentImages, setCurrentImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(null)
    const [query, setQuery] = useState("")
    const [value, setValue] = useState("")
    const [imagesPerPage, setimagesPerPage] = useState(16)
    const [totalPages, setTotalPages] = useState(0)
    const [pageOfItems, setPageOfItems] = useState([])

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

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
        fetchPhotos(`${value}`, pageNumber)
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, imagesPerPage } = data;
    
        const offset = (currentPage - 1) * imagesPerPage;
        setCurrentImages(images.slice(offset, offset + imagesPerPage));
        // const currentImages = allCountries.slice(offset, offset + imagesPerPage);
        
        // this.setState({ currentPage, currentCountries, totalPages });
    }
    
    const onChangePage = (pageOfItems) => {
        setPageOfItems(pageOfItems);
        // fetchPhotos(`${value}`, pageOfItems)
    }

    const handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
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
            <Pagination
                prevPageText='prev'
                nextPageText='next'
                firstPageText='first'
                lastPageText='last'
                activePage={currentPage}
                itemsCountPerPage={imagesPerPage}
                totalItemsCount={totalPages}
                onChange={(page) => handlePageChange(page)}
                />
            {/* <Pagination items={images} onChangePage={(page) => onChangePage(page)} /> */}
            {/* <Pagination totalRecords={totalPages} imagesPerPage={imagesPerPage} pageNeighbours={1} onPageChanged={() => onPageChanged()} /> */}
            {/* <Pagination imagesPerPage = {imagesPerPage} totalPages = {totalPages} pageNeighbours={1} paginate={paginate} /> */}
        </div>
    )
}

export default SearchBar;