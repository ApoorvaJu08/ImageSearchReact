import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render(){
        return(
            <div className="intro-container">
                <div className="row">
                    <div className="col s12">
                        <p className="intro-para">
                            Request for a particular category of images and use the ones seleted by you anytime, anywhere.
                        </p>
                        <Link to="/search">
                            <button className="btn waves-effect waves-light btn-large" type="submit" name="action">
                                Start Searching
                                <i className="material-icons right">send</i>
                            </button>
                        </Link>
                    </div>
                    <div className="col s12 img-div">
                        <img src={process.env.PUBLIC_URL + '/assets/images/search-vs-display-blog-1280x720-removebg.png'} className="banner-img"></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;