import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

class Login extends Component{

    componentWillMount() {
        if (this.props.authenticated) {
            this.context.router.history.push('/mainpage');
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.authenticated) {
            this.context.router.history.push('/mainpage');
        }
    }
    handleFormSubmit({email, password}){
        this.props.signinUser({email, password});
    }


    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                  <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){

        const {handleSubmit, fields: {email, password }} = this.props;


        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className="form-group">
                <label>Email</label>
                <input {...email} className="form-control" />
              </fieldset>
              <fieldset className="form-group">
                <label>Password</label>
                <input {...password} type="password" className="form-control" />
              </fieldset>
                {this.renderAlert()}
              <button action="submit" className="btn btn-primary">Sign in </button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}
Login.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Login);

