import React from 'react';
import { Link, connect, dispatcher } from 'jetski';

let styles = {
  backgroundColor: 'HotPink ',
  width: '250px',
  height: '100px',
  borderRadius: '100px',
  display: 'block',
  fontSize: '25px',
  border: '3px solid '
}

let newStyles = {
  ...styles,
  textAlign: 'center',
  lineHeight: '100px',
  textDecoration: 'none',
  color: 'black',
  fontFamily: 'system-ui'
}

let containerStyle = {
  width: 600,
  height: 100,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '50px auto',
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, newHover: false };
  }
  render() {
    const { onSubmit } = this.props;
    return (
      <div style={containerStyle}>
        <button style={!this.state.hover ? styles : { ...styles, backgroundColor: 'DarkTurquoise ' }}
          onMouseOut={() => { this.setState({ hover: false }) }}
          onMouseOver={() => { this.setState({ hover: true }) }}
          onClick={onSubmit}
        >Press to see News</button>
        <Link 
          to='/new'
          style={!this.state.newHover ? newStyles : { ...newStyles, backgroundColor: 'DarkTurquoise ' }}
          onMouseOut={() => { this.setState({ newHover: false }) }}
          onMouseOver={() => { this.setState({ newHover: true }) }}>
            New Article
        </Link>
      </div>
    );
  }

};

export default connect(
  null,
  dispatcher,
)(Button);
