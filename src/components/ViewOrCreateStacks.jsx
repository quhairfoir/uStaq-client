import React, {Component} from 'react';
import Stacks from './Stacks';
import Create from './Create';
import Edit from './Edit';

import axios from 'axios';

class ViewOrCreateStacks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      stackId: null
    }
  }

  handleSaveEdit = (stack, stackId) => {
    console.log(`AXIOS SAVE ${stackId}: ${stack}`);
    axios.post(`http://localhost:8080/stacks/edit/${stackId}`, stack)
    .then(response =>
      console.log('Axios save:', response)
    )
    .catch(error =>
      console.error(error)
    )
    this.togglePageMode(null)
  }

  togglePageMode = (stackId) => {
    let edit = !this.state.edit
    this.setState({ stackId }, () => {
      this.setState({ edit })
    })
  }

  renderPage() {
    if (this.state.edit) {
     return  <Edit stackId={this.state.stackId} handleSaveEdit={this.handleSaveEdit} />
    }
    else {
      return (<div className="row">
        <div className="col-sm-8 imgResponsive">
          <Stacks
            stacks={this.props.stacks}
            toggleEdit={this.togglePageMode}
            getUserStacks={this.props.getUserStacks}
            userObj={this.props.userObj}
            />
        </div>
        <div className="col-sm-4">
          <Create handleSubmitStack={this.props.handleSubmitStack} toggleEdit={this.togglePageMode} />
        </div>
      </div>)
    }
  }


  render () {

    let editORstacks = this.renderPage()
    return(
    <div className="container imgResponsive" style={{width: '100%'}}>
      {editORstacks}
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
