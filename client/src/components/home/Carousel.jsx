import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img  src="https://kalyanekhurd1.weebly.com/uploads/1/3/0/2/130209407/20190119-194328.jpg" alt="Slide 1" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://kalyanekhurd1.weebly.com/uploads/1/3/0/2/130209407/gbwa-20190126094904_orig.jpg" alt="Slide 2" />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>
        );
    }
}

export default DemoCarousel;