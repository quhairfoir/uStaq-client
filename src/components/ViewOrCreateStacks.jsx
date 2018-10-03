import React, {Component} from 'react';
import Stacks from './Stacks';
import Create from './Create';
import Edit from './Edit';
import '../styles/Loading.css'
import axios from 'axios';



class ViewOrCreateStacks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      stackId: null,
      loading: false,
      loadingMsgs: "Loading...",
      userObj: null
    }
  }

  componentDidMount() {
    if (this.props.userObj) {
      this.setState({ userObj: this.props.userObj })
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

  toggleEdit = (stackId) => {
    if (stackId) {
      this.setState({ stackId }, () => {
        this.setState({ edit: !this.state.edit })
      })
    } else {
      this.setState({ edit: !this.state.edit })
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  setLoadingDialogue = () => {
    let sentences = ['Your cards are beginning their journey...', 'of passing through a Google API...', 'ranking for relevance...', 'recursively making relational forests...', '...and making their way to you!'];
    sentences.forEach((sentence, index) => {
      setTimeout(() => {
        let msg = <p className="loading-message">{sentence}</p>
        this.setState({ loadingMsgs: [...this.state.loadingMsgs, msg] })
      }, (index + 1) * 2000)
    })
    setTimeout(() => {
      let finalMsg = <div><br /><p className="loading-message">Wow... this stack is going to be huge.</p><br /><p>You'll have a <strong>LOT</strong> to learn.</p></div>
      this.setState({ loadingMsgs: [...this.state.loadingMsgs, finalMsg] })
    }, 16000)
  }

  renderSidebar() {
    if (!this.state.loading) {
      return (
        <div className="col-sm-4">
          <Create handleSubmitStack={this.props.handleSubmitStack} toggleEdit={this.toggleEdit} toggleLoading={this.toggleLoading} setLoadingDialogue={this.setLoadingDialogue} />
        </div>
      )
    } else {
      return (
        <div className="col-sm-4 loading-div">
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          {this.state.loadingMsgs}
        </div>
      )
    }
  }
  

  renderPage() {
    let createORloading = this.renderSidebar()
    if (this.state.userObj) {
      if (this.state.edit) {
        return  (<Edit stackId={this.state.stackId} handleSaveEdit={this.handleSaveEdit} toggleEdit={this.toggleEdit} />)
      } else {
        return (
          <div className="row">
            <div className="col-sm-8">
              <Stacks stacks={this.props.stacks} toggleEdit={this.toggleEdit} getUserStacks={this.props.getUserStacks} userObj={this.props.userObj} />
            </div>
            {createORloading}
          </div>
        )
      }  
    } else {
      return (<h3>Sign in to create and view stacks!</h3>)
    } 
  }


  render () {
    let editORstacks = this.renderPage()
    return(
    <div className="container" style={{width: '100%'}}>
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
