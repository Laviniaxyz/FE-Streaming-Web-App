import React from "react"
import {fetchStream} from '../../actions'
import {connect} from 'react-redux'

class StreamShow extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }
  
  render() {
    console.log(this.props)
    if (!this.props.stream) {
      return <div>Loading</div>
    }

  const {title, description} = this.props.stream

    return(
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow)