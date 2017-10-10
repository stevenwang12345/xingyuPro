import React from 'react';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const MobileIndexPage = React.createClass({
  render() {
    return (
      <div>
           {this.props.children || ''}
      </div>
    )
  }
})


export default MobileIndexPage;