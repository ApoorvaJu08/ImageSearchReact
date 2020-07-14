import React, {useState} from 'react';
import LazyLoad from 'react-lazyload';
import './SearchBar.css';

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

function SearchBar() {
    const [value, setValue] = useState("")
    const [results, setResults] = useState([])
    const [item, setItem] = useState([])

    const fetchImages = () => {
        fetch(`https://api.unsplash.com/search/photos?client_id=lXV5rBTZvtCk-dHQnQdFXSbwocD2_re_nucqQdOwWok&query=${value}&orientation=squarish`)
        .then(res => res.json())
        .then(data => {
            setResults(data.results)
            setItem(data.results.slice(0, 5))
            const len = results.length
        })
    }

    const next = () => {
        setItem(results.slice(5, 11))
    }

    const prev = () => {
        setItem(results.slice(0, 5))
    }

    return(
        <div className="Search container">
            <div className="search-box input-field">
                <input className="search-input" type="text" value={value} 
                onChange={(e) => setValue(e.target.value)} placeholder="Search..."
                style={{width: "70%", color: "#4e54c8"}}/>
                <button className="btn waves-effect waves-light btn-large search-btn" onClick={() => fetchImages()}>Search</button>
            </div>
            <div className="gallery">
                {/* {    */}
                    <LazyLoad placeholder={<Loading />}>
                        {
                            item.map((item1) => {
                                return(
                                    <img className="item animate__animated animate__pulse" key={item1.id} src={item1.urls.regular} />
                                )  
                            })
                        }
                    </LazyLoad>
                {/* } */}
            </div>
            <div className="slide-btns-div">
                <button className="btn waves-effect waves-light slide-btn" onClick={prev}>
                    <i className="material-icons">first_page</i>
                </button>
                <button className="btn waves-effect waves-light" onClick={next}>
                    <i className="material-icons">last_page</i>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;