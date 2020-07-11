import React from 'react';
import './Overview.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Overview extends React.Component {
    render(){
        return(
            <Container className="animate__animated animate__fadeInLeft">
                <h5 className="heading">Instant Solution to your query</h5>
                <Row className="content">
                    <Col sm className="icon-div">
                        <div className="img-div1 img-div">
                            <div className="number-circle1 number-circle">
                                <div className="number">1</div>
                            </div>
                            <img src={process.env.PUBLIC_URL + '/assets/images/first-icon.png'} className="icon"></img>
                        </div>
                        <h6 className="heading-beneath-icon head1">Request Images</h6>
                    </Col>
                    <Col sm className="icon-div">
                        <div className="img-div2 img-div">
                            <div className="number-circle2 number-circle">
                                <div className="number">2</div>
                            </div>
                            <img src={process.env.PUBLIC_URL + '/assets/images/middle-icon.png'} className="icon"></img>
                        </div>
                        <h6 className="heading-beneath-icon head1">Get responses</h6>
                    </Col>
                    <Col sm className="icon-div">
                        <div className="img-div3 img-div">
                            <div className="number-circle3 number-circle">
                                <div className="number">3</div>
                            </div>
                            <img src={process.env.PUBLIC_URL + '/assets/images/third-icon.png'} className="icon"></img>
                        </div>
                        <h6 className="heading-beneath-icon head1">Choose the best from the rest</h6>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Overview;