
import React  from 'react';
import ReactDOM from 'react-dom'
import '../styles/carousel.css';

import {Carousel} from 'react-responsive-carousel';

const CardCarousel = (props) => (
  <Carousel
    showArrows={true}
    infiniteLoop
    useKeyboardArrows
    showIndicators={false}
    showThumbs={false}
    width="100%"
    onChange={props.selectedItemHandle}
    selectedItem={props.selectedItem}>

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
