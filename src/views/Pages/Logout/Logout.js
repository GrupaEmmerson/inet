import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Logout extends Component{


  componentWillMount(){
    this.props.signoutUser();
    if (!this.props.authenticated) {
        this.context.router.history.push('/');
    }
  }

  componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
          this.context.router.history.push('/');
      }
  }

  render(){
    return <div>Sorry to see you go.</div>
  }
}
function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

Logout.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(Logout);
