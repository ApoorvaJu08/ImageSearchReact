import React from 'react';
import axios from 'axios';
import './style.css';
import SearchBar from './SearchBar';
import Slide from './Slide';
import Overview from './Overview';
import NoImgs from './NoImgs';
const API_KEY = process.env.REACT_APP_API_KEY

class App extends React.Component  {
    state = { images: [] };
    
    onSearchSubmit = async (term) => {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: term},
            headers: {
                Authorization: `Client-ID ${API_KEY}`
            }
        })
        this.setState({ images: response.data.results })
    }
    
    render() {
        return (
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        )
    }

}

export default App;