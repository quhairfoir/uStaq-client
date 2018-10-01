// https://www.npmjs.com/package/react-responsive-carousel
import React  from 'react';
import ReactDOM from 'react-dom'
import '../styles/carousel.css';

import {Carousel} from 'react-responsive-carousel';

const CardCarousel = (props) => (
  <Carousel showArrows={true} infiniteLoop useKeyboardArrows showIndicators={false} showThumbs={false} width="100%">
    {

      props.stacks.map((stack, index) => (
        stack.sentences.map((sentence, i) =>
          <div className="container">
            <div className="row">
              <div className="info-card">
                <div className="front">
                  <p className="legend">Card front. {sentence.front}</p>
                </div>
                <div className="back">
                  <p className="legend">Card reverse. {sentence.back}</p>
                </div>
              </div>
            </div>
          </div>
        )
      ))
    }
  </Carousel>

)
export default CardCarousel
// ReactDOM.render(<CardCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
