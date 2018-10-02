// https://www.npmjs.com/package/react-responsive-carousel
import React  from 'react';
import ReactDOM from 'react-dom'
import '../styles/carousel.css';

import {Carousel} from 'react-responsive-carousel';

const CardCarousel = (props) => (
  <Carousel showArrows={true} infiniteLoop useKeyboardArrows showIndicators={false} showThumbs={false} width="100%">
    {
        props.stack.sentences.map((sentence, index) =>
          <div className="container" key={index}>
            <div className="row">
              <div className={`info-card ${props.isFlipped ? 'flipped' : ''}`}>
                <div className='front'>
                  <p className="legend">{sentence.front}</p>
                </div>
                <div className='back'>
                  <p className="legend">{sentence.back}</p>
                </div>
              </div>
            </div>
          </div>

      )
    }
  </Carousel>

)
export default CardCarousel
// ReactDOM.render(<CardCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
