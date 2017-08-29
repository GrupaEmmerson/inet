import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import {Doughnut} from "react-chartjs-2";
import classnames from "classnames";

const zrob = 75;
const zrob2 = 95;
const stylemain = {textAlign: 'center'};
const chartsOptions ={
    legend: false,
    tooltips: {
        intersect: false,
        mode: 'dataset',
        displayColors: false,
    }
};
const data1 = {
    labels: [
        'Zrobione',
        ''
    ],
    datasets: [{
        data: [zrob, 100-zrob],
        backgroundColor: [
            '#4dbd74',
            '#cccccc'
        ],
        hoverBackgroundColor: [
            '#4dbd74',
            '#cccccc'
        ]
    }]
};

const data2 = {
    labels: [
        'Zrobione',
        ''
    ],
    datasets: [{
        data: [zrob2, 100-zrob2],
        backgroundColor: [
            '#4dbd74',
            '#cccccc'
        ],
        hoverBackgroundColor: [
            '#4dbd74',
            '#cccccc'
        ]
    }]
};

const data3 = {
    labels: [
        'Zrobione',
        ''
    ],
    datasets: [{
        data: [zrob2, 100-zrob2],
        backgroundColor: [
            '#20a8d8',
            '#cccccc'
        ],
        hoverBackgroundColor: [
            '#20a8d8',
            '#cccccc'
        ]
    }]
};

const data4 = {
    labels: [
        'Zrobione',
        ''
    ],
    datasets: [{
        data: [zrob, 100-zrob],
        backgroundColor: [
            '#20a8d8',
            '#cccccc'
        ],
        hoverBackgroundColor: [
            '#20a8d8',
            '#cccccc'
        ]
    }]
};





class MainPage extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            activeTab1: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render(){
        if(!this.props.users){
            return (
                <div style={stylemain}>
                    <b>Top Emmerson</b>
                    <Col xs="12" md="12" className="mb-4">
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
                                <Row>
                                    <Col xs="12" md="6">
                                        <b>Miesiąc</b><br/>
                                        Umowy zbycia i wynajmu
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                        Umowy Premium
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/>
                                        Umowy zbycia i wynajmu
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                        Umowy Premium
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col xs="12" md="6">
                                        <b>Miesiąc</b><br/>
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/>
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Najlepszy <br/>zespół
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Najlepszy zespół <br/> Srednia na doradce
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Najlepszy <br/>doradca
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col xs="12" md="6">
                                        <b>Miesiąc</b><br/>
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Rynek wtórny
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Rynek pierwotny
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Rynek komercyjny
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/>
                                        <Col xs="12" md="12" className="mb-4">
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '1' })}
                                                        onClick={() => { this.toggle1('1'); }}
                                                    >
                                                        Rynek wtórny
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '2' })}
                                                        onClick={() => { this.toggle1('2'); }}
                                                    >
                                                        Rynek pierwotny
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab1 === '3' })}
                                                        onClick={() => { this.toggle1('3'); }}
                                                    >
                                                        Rynek komercyjny
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab1}>
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
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>

                    <Row>
                        <Col xs="12" sm="6" >
                            <Card className="card-accent-success">
                                <CardHeader> Ten Miesiąc </CardHeader>
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Doughnut options={chartsOptions} data={data1}/>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Doughnut options={chartsOptions} data={data2}/>
                                        </Col>
                                    </Row>
                                </CardBlock>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" >
                            <Card className="card-accent-primary">
                                <CardHeader> Poprzedni miesiąc </CardHeader>
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Doughnut options={chartsOptions}  data={data3}/>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Doughnut options={chartsOptions} data={data4}/>
                                        </Col>
                                    </Row>
                                </CardBlock>

                            </Card>
                        </Col>
                    </Row>

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