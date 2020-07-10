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
        const len = this.state.images.length;
        let slider;
        if(len > 0){
            slider = <Slide
                interval={3000}
                images={this.state.images}
            />;
        }
        // else if(len == 0) {
        //     slider = <NoImgs />;
        // }
        else{
            slider = <Overview />;
        }
        return (
            <div className="body-bg">
                {/* <div className="app-heading"> */}
                    {/* <span className="heading">Collosal Images</span> */}
                    <SearchBar userSubmit={this.onSearchSubmit}/>
                {/* </div> */}
                {slider}
            </div>
        )
    }

}

export default App;