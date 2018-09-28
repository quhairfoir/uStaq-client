// https://www.npmjs.com/package/react-responsive-carousel
import React from 'react';
import ReactDOM from 'react-dom'
import carousel from './carousel.css';

import {Carousel} from 'react-responsive-carousel';

const CardCarousel = (props) => (
          // {props.description}
  <Carousel showArrows={true} infiniteLoop useKeyboardArrows showIndicators={false} showThumbs={false} width="100%">

    <div className="container">
    	<div className="row">
    		<div className="info-card">
  				<div className="front">
            <p className="legend">{props.description}Card 1. Front Side</p>
  				</div>
    			<div className="back">
            <p className="legend">{props.description}Card 1. Reverse Side</p>
    			</div>
    		</div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="info-card">
          <div className="front">
            <p className="legend">{props.description}Card 2. Front Side</p>
          </div>
          <div className="back">
            <p className="legend">{props.description}Card 2. Reverse Side</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="info-card">
          <div className="front">
            <p className="legend">{props.description}Card 3. Front Side</p>
          </div>
          <div className="back">
            <p className="legend">{props.description}Card 3. Reverse Side</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="info-card">
          <div className="front">
            <p className="legend">{props.description}Card 4. Front Side</p>
          </div>
          <div className="back">
            <p className="legend">{props.description}Card 4. Reverse Side</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="info-card">
          <div className="front">
            <p className="legend">{props.description}Card 5. Front Side</p>
          </div>
          <div className="back">
            <p className="legend">{props.description}Card 5. Reverse Side</p>
          </div>
        </div>
      </div>
    </div>
  </Carousel>

)
export default CardCarousel
// ReactDOM.render(<CardCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
