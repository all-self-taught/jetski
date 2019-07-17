import React from 'react';
import { connect } from 'jetski'
import img from '../loading_spinner.gif'

const Loading = ({ loading }) => (

  loading ?
    <div style={{ textAlign: 'center' }}>
      <img src={img} alt='loading' />
      <h1>LOADING</h1>
    </div> :
    null
);

const mapStateToProps = (state) => ({
  loading: state.page.pageLoading
})

export default connect(
  mapStateToProps,
  null
)(Loading)


