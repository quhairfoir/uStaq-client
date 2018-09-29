import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import TopNav from './TopNav'

import './Main.css';

class Main extends React.Component {
  render() {
    return (<div></div>)
  }

  brender() {
    return (
      <div class='title-page'>
        <div class='overlay'></div>
      <div class='title-box-container'>
        <span>
          <div id="title-card-0" class='card bottom'>
            <div id="title-card-1" class='card top'>
              <div class='title-box'>
                <h1>uLearn</h1>
              </div>
            </div>
          </div>
        </span>
        <span>
          <div id="title-card-2" class='card bottom'>
            <div id="title-card-3" class='card'>
              <div id="title-card-4" class='card top'>
                <div class='title-box'>
                  <h1>uPlay</h1>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span>
          <div id="title-card-5" class='card bottom'>
            <div id="title-card-6" class='card'>
              <div id="title-card-7" class='card'>
                <div id="title-card-8" class='card top'>
                  <div class='title-box'>
                    <h1 class='ghostly'>————</h1>
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
