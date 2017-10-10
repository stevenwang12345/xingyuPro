import React from 'react';
const IndexPage = React.createClass({
  render() {
    return (
      <div>
        {this.props.children || ''}
      </div>
    )
  }
})


export default IndexPage;