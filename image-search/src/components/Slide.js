import React, {useState, useEffect} from 'react';
import LazyLoad from 'react-lazyload';
import './Slide.css';

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

export default function Slideshow({images, interval=3000}){
    let [currImage, setCurrImage] = useState(0);

    function prev() {
        if(currImage === 0){
            setCurrImage(currImage);
        }
        else{
            setCurrImage(currImage - 1);
        }
    }

    function next() {
        if(currImage === images.length - 1){
            setCurrImage(currImage);
        }
        else{
            setCurrImage(currImage + 1);
        }
    }

    return (
        <section className="slideshow animate__animated animate__fadeInRight">
            <div className="slide-holder">
                <LazyLoad key={currImage} placeholder={<Loading />}>
                    <section className="slide current-slide">
                        <div className="slide-thumbnail">
                            <img src={images[currImage].urls.regular} className="unsplash-image"></img>
                        </div>
                    </section>
                </LazyLoad>
            </div>          
            <div className="slideshow-controller">
                <span onClick = {prev}>Previous</span>
                <span onClick = {next}>Next</span>
            </div>
        </section>
    )
}