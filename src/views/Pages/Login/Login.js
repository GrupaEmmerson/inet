import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions';
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
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
        this.props.dispatch(actions.signinUser({email, password}));
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
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup className="mb-0">
                                <Card className="p-4">
                                    <CardBlock className="card-body">
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                <Field
                                                    className="form-control"
                                                    name="email"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Login"
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                                <Field
                                                    className="form-control"
                                                    name="password"
                                                    component="input"
                                                    type="password"
                                                    placeholder="Hasło"
                                                />
                                            </InputGroup>
                                            {this.renderAlert()}
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" action="submit">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBlock>
                                </Card>
                                <Card className="text-white bg-dark py-5 d-md-down-none" style={{ width: 40 + '%' }}>
                                    <CardBlock className="card-body text-center">
                                        <div>
                                            <h3>Emmerson Realty S.A.</h3>
                                            <img src="http://www2.emmerson.pl/logo.gif" style={{ width: 100 + '%' }}/>
                                        </div>
                                    </CardBlock>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
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

