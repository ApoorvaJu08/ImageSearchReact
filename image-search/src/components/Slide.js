import React, {useState, useEffect} from 'react';
import LazyLoad from 'react-lazyload';
import './Slide.css';

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

export default function Slideshow({images, interval=3000}){
    let [prevImage, setPrevImage] = useState(0);
    let [currImage, setCurrImage] = useState(0);
    let [nextImage, setNextImage] = useState(1);

    function prev() {
        if(prevImage === 0){
            // nextImage = images[thumbnails.length - 1].urls.regular;
        }
        else{
            setPrevImage(prevImage - 1);
            setCurrImage(currImage - 1);
            setNextImage(nextImage - 1);
        }
    }

    function next() {
        if(nextImage === images.length - 1){
            // nextImage = images[thumbnails.length - 1].urls.regular;
        }
        else{
            setPrevImage(prevImage + 1);
            setCurrImage(currImage + 1);
            setNextImage(nextImage + 1);
        }
    }

    return (
        <section className="slideshow animate__animated animate__fadeInRight">
            <div className="slide-holder">
                {/* <section className="slide previous-slide">
                    <div className="slide-thumbnail">
                        <img src={images[prevImage].urls.regular} className="unsplash-image"></img>
                    </div>
                </section> */}
                <LazyLoad key={currImage} placeholder={<Loading />}>
                    <section className="slide current-slide">
                        <div className="slide-thumbnail">
                            <img src={images[currImage].urls.regular} className="unsplash-image"></img>
                        </div>
                    </section>
                </LazyLoad>
                
                {/* <section className="slide current-slide">
                    <div className="slide-thumbnail">
                        <img src={images[nextImage].urls.regular} className="unsplash-image"></img>
                    </div>
                </section>     */}
            </div>          
            <div className="slideshow-controller">
                <span onClick = {prev}>Previous</span>
                {/* <span onClick={changeSlide("next")}>Next</span> */}
                <span onClick = {next}>Next</span>
            </div>
        </section>
    )
}