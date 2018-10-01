import React, {Component} from 'react';
import Stacks from './Stacks';
import Create from './Create';
import Edit from './Edit';

class ViewOrCreateStacks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      stackId: null
    }
  }

  togglePageMode = (stackId) => {
    let edit = this.state.edit ? false : true
    this.setState({ edit })
    this.setState({ stackId })
  }

  renderPage() {
    if (this.state.edit) {
     return  <Edit stackId={this.state.stackId} />
    }
    else {
      return (<div className="row">
        <div className="col-sm-10">
          <Stacks stacks={this.props.stacks} toggleEdit={this.togglePageMode}/>
        </div>
        <div className="col-sm-2" style={{background: '#942'}}>
          <Create handleSubmitStack={this.props.handleSubmitStack} />
        </div>
      </div>)
    }
  }


  render () {

    let editORstacks = this.renderPage()
    return(
    <div className="container" style={{width: '100%'}}>
      {editORstacks}
      <button onClick={this.togglePageMode}>TOGGLE</button>
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