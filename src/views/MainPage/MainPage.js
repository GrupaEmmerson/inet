import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import {Doughnut} from "react-chartjs-2";
import classnames from "classnames";
import Widget02 from './Widget';

const zrob = 75;
const zrob2 = 95;

const stylemain = {textAlign: 'center'};
const stylePercent = {
    position: 'absolute',
    left: '0',
    top: '42%',
    width: '100%',

};
const chartsOptions ={
    legend: false,
    tooltips: {
        enabled: false,
        intersect: false,
        mode: 'dataset',
        displayColors: false,
        callbacks: {
            label: function(tooltipItem, data) {
                    return data.datasets[0].data[0] + ' %';
            }
        }
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

    componentWillMount(){
        this.props.getTopEmmersonMonthOffer();
        this.props.getTopEmmersonYearOffer();
        this.props.getTopEmmersonMonthOfferPremium();
        this.props.getTopEmmersonYearOfferPremium();
        this.props.getNewsLatest();
        this.props.getTopEmmersonMonthTransactions();
        this.props.getTopEmmersonYearTransactions();
        this.props.getTopEmmersonMonthHighestProvision();
        this.props.getTopEmmersonYearHighestProvision();
    }

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

    getManager(manager){
        return(
            <h2>
                <img src={'https://inet.emmerson.pl/'+ manager.photoUrl} alt="Brak" /><br/>
                {manager.name}
            </h2>
        )
    }
    getManagerPremium(manager){
        return(
            <h2>
                <img src={'https://inet.emmerson.pl/'+ manager.photoUrl} alt="Brak" /><br/>
                {manager.name}
            </h2>
        )
    }
    getManagerTransaction(manager){
        return(
            <h2>
                <img src={'https://inet.emmerson.pl/'+ manager.photoUrl} alt="Brak" /><br/>
                {manager.name}
            </h2>
        )
    }
    getUser(user){
        return(
            <span>
                <h1>
                    {user.name}
                    <br/>
                </h1>

                <h2>
                    <img src={'https://inet.emmerson.pl/'+ user.photoUrl} alt="Brak" /><br/>
                    {user.team_name}
                </h2>
            </span>
        );
    }
    getUserPremium(user){
        return(
            <span>
                <h1>
                    {user.name}
                    <br/>
                </h1>

                <h2>
                    <img src={'https://inet.emmerson.pl/'+ user.photoUrl} alt="Brak"/><br/>
                    {user.team_name}
                </h2>
            </span>
        );
    }
    getUserTransaction(user){
        return(
            <span>
                <h1>
                    {user.name}
                </h1>
                    <br/>
                <h2>
                    <img src={'https://inet.emmerson.pl/'+ user.photoUrl} alt="Brak" /><br/>
                    {user.team_name}
                </h2>
            </span>
        );
    }
    getNews(news){
        const regex = /(<([^>]+)>)/ig;
        return(
            <Col xs="12" sm="12" md="6">
                <Widget02 header={news.title} mainText={news.text.replace(regex,"").substring(0, 300) + "..."} icon="fa fa-cogs" color="primary" footer link="#/mainpage"/>
            </Col>
        )
    }

    render(){
            // console.log(this.props.top_emmerson_month_offer);
            // console.log(this.props.top_emmerson_year_offer);
            // console.log(this.props.top_emmerson_month_offer_premium);
            // console.log(this.props.top_emmerson_year_offer_premium);
            // console.log(this.props.top_emmerson_month_transaction);
            // console.log(this.props.top_emmerson_year_transaction);
            console.log(this.props.top_emmerson_month_highest_provision);
            console.log(this.props.top_emmerson_year_highest_provision);
            return (
                <div >
                    <Col xs="12" style={stylemain} className="h1">
                        <b>Top Emmerson</b>
                    </Col>
                    <Col xs="12" md="12" className="mb-4" style={stylemain}>
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
                                        <b>Miesiąc</b><br/><br/>
                                        <div className="h2"> Umowy zbycia i wynajmu </div>
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
                                                    { this.props.top_emmerson_month_offer ? <div><h1> {this.props.top_emmerson_month_offer.top_offer.team_name} </h1><br/>{this.props.top_emmerson_month_offer.top_offer.manager.map(this.getManager)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_month_offer ? <div><h1> {this.props.top_emmerson_month_offer.top_offer_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_month_offer.top_offer_per_advicer.manager.map(this.getManager)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_month_offer ? <div><h1> {this.props.top_emmerson_month_offer.top_offer_advicer.map(this.getUser)} </h1></div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                        <div className="h2"> Umowy Premium </div>
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
                                                    { this.props.top_emmerson_month_offer_premium ? <div><h1> {this.props.top_emmerson_month_offer_premium.top_offer_premium.team_name} </h1><br/>{this.props.top_emmerson_month_offer_premium.top_offer_premium.manager.map(this.getManagerPremium)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_month_offer_premium ? <div><h1> {this.props.top_emmerson_month_offer_premium.top_offer_premium_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_month_offer_premium.top_offer_premium_per_advicer.manager.map(this.getManagerPremium)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_month_offer_premium ? <div><h1> {this.props.top_emmerson_month_offer_premium.top_offer_premium_advicer.map(this.getUserPremium)} </h1></div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/><br/>
                                        <div className="h2"> Umowy zbycia i wynajmu </div>
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
                                                    { this.props.top_emmerson_year_offer ? <div><h1> {this.props.top_emmerson_year_offer.top_offer.team_name} </h1><br/>{this.props.top_emmerson_year_offer.top_offer.manager.map(this.getManager)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_year_offer ? <div><h1> {this.props.top_emmerson_year_offer.top_offer_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_year_offer.top_offer_per_advicer.manager.map(this.getManager)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_year_offer ? <div>{this.props.top_emmerson_year_offer.top_offer_advicer.map(this.getUser)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                        <div className="h2"> Umowy Premium </div>
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
                                                    { this.props.top_emmerson_year_offer_premium ? <div><h1> {this.props.top_emmerson_year_offer_premium.top_offer_premium.team_name} </h1><br/>{this.props.top_emmerson_year_offer_premium.top_offer_premium.manager.map(this.getManagerPremium)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_year_offer_premium ? <div><h1> {this.props.top_emmerson_year_offer_premium.top_offer_premium_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_year_offer_premium.top_offer_premium_per_advicer.manager.map(this.getManagerPremium)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_year_offer_premium ? <div>{this.props.top_emmerson_year_offer_premium.top_offer_premium_advicer.map(this.getUserPremium)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col xs="12" md="6">
                                        <b>Miesiąc</b><br/><br/>
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
                                                    { this.props.top_emmerson_month_transaction ? <div><h1> {this.props.top_emmerson_month_transaction.top_transaction_month.team_name} </h1><br/>{this.props.top_emmerson_month_transaction.top_transaction_month.manager.map(this.getManagerTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_month_transaction ? <div><h1> {this.props.top_emmerson_month_transaction.top_transaction_month_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_month_transaction.top_transaction_month_per_advicer.manager.map(this.getManagerTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_month_transaction ? <div>{this.props.top_emmerson_month_transaction.top_transaction_month_advicer.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/><br/>
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
                                                    { this.props.top_emmerson_year_transaction ? <div><h1> {this.props.top_emmerson_year_transaction.top_transaction_year.team_name} </h1><br/>{this.props.top_emmerson_year_transaction.top_transaction_year.manager.map(this.getManagerTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_year_transaction ? <div><h1> {this.props.top_emmerson_year_transaction.top_transaction_year_per_advicer.team_name} </h1><br/>{this.props.top_emmerson_year_transaction.top_transaction_year_per_advicer.manager.map(this.getManagerTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_year_transaction ? <div>{this.props.top_emmerson_year_transaction.top_transaction_year_advicer.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col xs="12" md="6">
                                        <b>Miesiąc</b><br/><br/>
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
                                                    { this.props.top_emmerson_month_highest_provision ? <div>{this.props.top_emmerson_month_highest_provision.highest_primary_month.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_month_highest_provision ? <div>{this.props.top_emmerson_month_highest_provision.highest_secondary_month.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_month_highest_provision ? <div>{this.props.top_emmerson_month_highest_provision.highest_commercial_month.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <b>Rok</b><br/><br/>
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
                                                    { this.props.top_emmerson_year_highest_provision ? <div>{this.props.top_emmerson_year_highest_provision.highest_primary_year.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    { this.props.top_emmerson_year_highest_provision ? <div>{this.props.top_emmerson_year_highest_provision.highest_secondary_year.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    { this.props.top_emmerson_year_highest_provision ? <div>{this.props.top_emmerson_year_highest_provision.highest_commercial_year.map(this.getUserTransaction)}</div> : ''}
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                    <Row style={stylemain}>
                        <Col xs="12" sm="6" >
                            <Card className="card-accent-success">
                                <CardHeader> Praca Operacyjna </CardHeader>
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Col xs="12" style={stylemain}>Poprzedni miesiąc</Col>
                                            <Col xs="12">
                                                <Col style={stylePercent} className="h4">{data1.datasets[0].data[0]}%</Col>
                                                <Doughnut options={chartsOptions} data={data1}/>
                                            </Col>
                                            <Col xs="12" style={stylemain}>na 1000</Col>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Col xs="12" style={stylemain}>Ten miesiąc</Col>
                                            <Col xs="12">
                                                <Col style={stylePercent} className="h4">{data2.datasets[0].data[0]}%</Col>
                                                <Doughnut options={chartsOptions} data={data2}/>
                                            </Col>
                                            <Col xs="12" style={stylemain}>na 1000</Col>
                                        </Col>
                                    </Row>
                                </CardBlock>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" >
                            <Card className="card-accent-primary">
                                <CardHeader> Obroty </CardHeader>
                                <CardBlock className="card-body">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Col xs="12" style={stylemain}>Poprzedni miesiąc</Col>
                                            <Col xs="12">
                                                <Col style={stylePercent} className="h4">{zrob2}%</Col>
                                                <Doughnut options={chartsOptions}  data={data3}/>
                                            </Col>
                                            <Col xs="12" style={stylemain}>na 1000</Col>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Col xs="12" style={stylemain}>Ten miesiąc</Col>
                                            <Col xs="12">
                                                <Col style={stylePercent} className="h4">{zrob}%</Col>
                                                <Doughnut options={chartsOptions} data={data4}/>
                                            </Col>
                                            <Col xs="12" style={stylemain}>na 1000</Col>
                                        </Col>
                                    </Row>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                    <Col xs="12" className="h2" style={stylemain}>
                        <b>Nowości</b>
                    </Col>
                    <Row>
                        { this.props.news_latest ? this.props.news_latest.map(this.getNews) : ''}
                    </Row>
                </div>
            )
    }
}

function mapStateToProps(state){
    return {
        top_emmerson_month_offer: state.top_emmerson_month_offer.top_emmerson_month_offer,
        top_emmerson_year_offer: state.top_emmerson_year_offer.top_emmerson_year_offer,
        top_emmerson_month_offer_premium: state.top_emmerson_month_offer_premium.top_emmerson_month_offer_premium,
        top_emmerson_year_offer_premium: state.top_emmerson_year_offer_premium.top_emmerson_year_offer_premium,
        top_emmerson_month_transaction: state.top_emmerson_month_transaction.top_emmerson_month_transaction,
        top_emmerson_year_transaction: state.top_emmerson_year_transaction.top_emmerson_year_transaction,
        top_emmerson_month_highest_provision: state.top_emmerson_month_highest_provision.top_emmerson_month_highest_provision,
        top_emmerson_year_highest_provision: state.top_emmerson_year_highest_provision.top_emmerson_year_highest_provision,
        news_latest: state.news_latest.news_latest
    }
}
MainPage.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(MainPage);