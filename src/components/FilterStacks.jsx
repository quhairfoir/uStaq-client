import React, { Component } from 'react'

// import { stacks } from '../models/resource'

import Stacks from './Stacks'

class VisibleStacks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredStacks: []
    }
  }

  componentWillMount(props) {
    this.setState({
      filteredStacks: props.stacks
    })
  }

  filterStacks = (stackFilter) => {
    let filteredStacks = filteredStacks.filter((stack) => {
      let stackName = stack.name
      return stackName.indexOf(
        stackFilter.toLowerCase()) !== -1
    })
    this.setState({
      filteredStacks
    })
  }

  render() {
    return (
      <Stacks stacks={this.state.filteredStacks} match={this.props.match} onChange={this.filterStacks} />
    )
  }
}

export default VisibleStacks
