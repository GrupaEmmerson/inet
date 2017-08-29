import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";

class MainPage extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentWillMount(){
        this.props.getUsers();
    }

    showUsers(user){

        return(
            <div key={user.profileId}><p>name: {user.username}<br/>email: {user.email}</p></div>
        );

    }

    render(){

        if(!this.props.users){
            return (
                <div>
                    Top Emmerson
                    <Col xs="12" md="6" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Umowy - pozyskane oferty
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Obroty
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Największe prowizje
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                1.
                            </TabPane>
                            <TabPane tabId="2">
                                2.
                            </TabPane>
                            <TabPane tabId="3">
                                3.
                            </TabPane>
                        </TabContent>
                    </Col>

                </div>
            )
        }


        return(
            <div>
                <p>This is the component for the user profile.</p>
                { this.props.users.map(this.showUsers) }
            </div>
        );
    }
}

function mapStateToProps(state){
    return { users: state.users.users }
}
MainPage.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(MainPage);