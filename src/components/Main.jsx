import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import TopNav from './TopNav'

import '../styles/Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className='title-page'>
        {/* <div className='overlay'></div> */}
        <div className='title-box-container'>
          <span>
            <div id="title-card-0" className='card bottom'>
              <div id="title-card-1" className='card top'>
                <div className='title-box'>
                  <h1>uLearn</h1>
                </div>
              </div>
            </div>
          </span>
          <span>
            <div id="title-card-2" className='card bottom'>
              <div id="title-card-3" className='card'>
                <div id="title-card-4" className='card top'>
                  <div className='title-box'>
                    <h1>uPlay</h1>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span>
            <div id="title-card-5" className='card bottom'>
              <div id="title-card-6" className='card'>
                <div id="title-card-7" className='card'>
                  <div id="title-card-8" className='top card'>
                    <div className='title-box'>
                      <h1 className='ghostly'>————</h1>
                    </div>
                    <div id="title-card-9" className='top card'>
                      <div className='title-box'>
                        <h1>
                          uStaq
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default Main
