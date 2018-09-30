import React, {Component} from 'react';
import Stacks from './Stacks';
import Create from './Create';

class ViewOrCreateStacks extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return(
    <div className="container" style={{width: '100%'}}>
      <div className="row">
        <div className="col-sm-10">
          <Stacks stacks={this.props.stacks} />
        </div>
        <div className="col-sm-2" style={{background: '#942'}}>
          <Create handleSubmitStack={this.props.handleSubmitStack} />
        </div>
      </div>
    </div>
  // <span>
  //   <div style={{width:'50%'}}>
  //     <Stacks {...props} stacks={props.stacks} />    
  //   </div>
  //   <div style={{width:'20%'}}>
  //     <Create/>
  //   </div>
  // </span>
    )
  }
}

export default ViewOrCreateStacks