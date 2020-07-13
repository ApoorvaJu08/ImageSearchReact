import React, {useState} from 'react';
import './SearchBar.css';
// import {GifPlayer} from 'GifPlayer'

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
                <button className="btn waves-effect waves-light btn-large" onClick={() => fetchImages()}>Search</button>
            </div>
            <div className="gallery">
                {   
                    item.map((item1) => {
                        if(results.length < 0){
                            return <> 
                            {/* <iframe src="https://giphy.com/embed/l46Cy1rHbQ92uuLXa" width="480" 
                            height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>
                                <a href="https://giphy.com/gifs/analytics-pixelmonkeys-tony-bab
                                el-l46Cy1rHbQ92uuLXa">via GIPHY</a></p>  */}
                            <img src={process.env.PUBLIC_URL + '/assets/images/search-vs-display-blog-1280x720-removebg.png'} className="banner-img"></img>
                            
                            {/* <GifPlayer gif="https://giphy.com/embed/l46Cy1rHbQ92uuLXa" still="https://giphy.com/embed/l46Cy1rHbQ92uuLXa" />     */}
                            </>
                        }
                        else {
                            return <img className="item" key={item1.id} src={item1.urls.regular} /> 
                        }
                                      
                    })
                }
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