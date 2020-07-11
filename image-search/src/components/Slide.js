import React, {useState, useEffect} from 'react';
import LazyLoad from 'react-lazyload';
import className from 'classnames';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Slide.css';

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

export default function Slideshow({images, interval=3000}){
    let [currImage, setCurrImage] = useState(0);
    const [animate, setAnimate] = useState(false);

    function prev() {
        if(currImage === 0){
            setCurrImage(currImage);
        }
        else{
            setCurrImage(currImage - 1);
        }
        setAnimate(animate);
    }

    function next() {
        if(currImage === images.length - 1){
            setCurrImage(currImage);
        }
        else{
            setCurrImage(currImage + 1);
        }
        setAnimate(!animate);
    }

    return (
        <section className="slideshow animate__animated animate__fadeInRight">
            <div className="slide-holder">
                <LazyLoad key={currImage} placeholder={<Loading />}>
                    <section className={`slide current-slide ${animate ? 'fadeInTopRight': 'fadeInTopLeft' }`}>
                        <div className="slide-thumbnail">
                            <img src={images[currImage].urls.regular} className="unsplash-image"></img>
                        </div>
                    </section>
                </LazyLoad>
            </div>          
            <div className="slideshow-controller">
                <span onClick = {prev} className="left-control"><FontAwesomeIcon icon={faArrowLeft} /></span>
                <span onClick = {next} className="right-control"><FontAwesomeIcon icon={faArrowRight} /></span>
            </div>
        </section>
    )
}