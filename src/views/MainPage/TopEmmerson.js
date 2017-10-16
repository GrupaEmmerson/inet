import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import PropTypes from 'prop-types';

const stylemain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};
const stylesecond = {textAlign: 'left', float: 'left', lineHeight: '1.15'};
const styleBlackText = {color: 'black'};
const stylePhoto = {height: '146px', float: 'right'};
const styleRedText = {color: 'red'};
const styleTopTitle = {fontSize: '23'};
const styleTopSecendary = {fontSize: '13'};
const propTypes = {
    name: PropTypes.string,
    team: PropTypes.string,
    jobTitle: PropTypes.string,
    branchZipCode: PropTypes.string,
    branchCity: PropTypes.string,
    branchAddress: PropTypes.string,
    mobile: PropTypes.string,
    companyUrl: PropTypes.string,
    photo: PropTypes.string,
    profiles: PropTypes.array,
    businessCard: PropTypes.object,
};

class TopEmmerson extends Component {

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

    getTopOfferAdvicer (advicer, key){

        const advicerBusinessCard = advicer[key].businessCard;
        if(!advicer){
            return(<div>Loading...</div>);
        }
        return(
            <span>
                <Row>
                <Col xs="11" style={stylesecond}>
                    <h1><br/></h1>
                    <table>
                        <tbody>
                        <tr><td ><span style={styleTopTitle}><b>{advicerBusinessCard.name} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>ZESPÓŁ {advicerBusinessCard.profiles[0].team} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>-DZIAŁ ? </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>STANOWISKO {advicerBusinessCard.profiles[0].jobTitle} </b></span></td></tr>
                        <tr><td> <br/></td></tr>
                        <tr><td> {advicerBusinessCard.profiles[0].company} <br/>
                            {advicerBusinessCard.profiles[0].branchAddress}, {advicerBusinessCard.profiles[0].branchZipCode} {advicerBusinessCard.profiles[0].branchCity}  <br/>
                            tel. kom. {advicerBusinessCard.mobile} <br/>
                            tel. {advicerBusinessCard.phone} <br/>
                            e-mail: {advicerBusinessCard.profiles[0].email} <br/>
                        <span style={styleRedText}><b>{advicerBusinessCard.profiles[0].companyUrl}</b></span></td></tr>
                        </tbody>
                    </table>
                </Col>
                <Col xs="1">
                    <img src={! advicerBusinessCard.photo  ?  'https://inet.emmerson.pl/images/icons/1.png' : advicerBusinessCard.photo ? 'https://inet.emmerson.pl/'+ advicerBusinessCard.photo :  'https://inet.emmerson.pl/images/icons/1.png'} alt="Brak"  style={stylePhoto} />
                </Col>
                </Row>
            </span>
        );
    }

    getTopOfferTeam (advicer, key){

        const advicerBusinessCard = advicer[key].businessCard;
        if(!advicer){
            return(<div>Loading...</div>);
        }
        return(
            <span>
                <Row>
                <Col xs="11" style={stylesecond}>
                    <h1><br/></h1>
                    <table>
                        <tbody>
                        <tr><td ><span style={styleTopTitle}><b>{advicerBusinessCard.name} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>ZESPÓŁ {advicerBusinessCard.profiles[0].team} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>-DZIAŁ ? </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>STANOWISKO {advicerBusinessCard.profiles[0].jobTitle} </b></span></td></tr>
                        <tr><td> <br/></td></tr>
                        <tr><td> {advicerBusinessCard.profiles[0].company} <br/>
                            {advicerBusinessCard.profiles[0].branchAddress}, {advicerBusinessCard.profiles[0].branchZipCode} {advicerBusinessCard.profiles[0].branchCity}<br/>
                            tel. kom. {advicerBusinessCard.mobile} <br/>
                            tel. {advicerBusinessCard.phone} <br/>
                            e-mail: {advicerBusinessCard.profiles[0].email} <br/>
                        <span style={styleRedText}><b>{advicerBusinessCard.profiles[0].companyUrl}</b></span></td></tr>
                        </tbody>
                    </table>
                </Col>
                <Col xs="1">
                    <img src={! advicerBusinessCard.photo  ?  'https://inet.emmerson.pl/images/icons/1.png' : advicerBusinessCard.photo ? 'https://inet.emmerson.pl/'+ advicerBusinessCard.photo :  'https://inet.emmerson.pl/images/icons/1.png'} alt="Brak"  style={stylePhoto} />
                </Col>
                </Row>
            </span>
        );
    }

    render() {
        const {user_card} = this.props;

        // if(!user_card){
        //     return(<div>Loading...</div>);
        // }

        return (
            <Row style={stylemain}>
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 12)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 14)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 13)}
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                    <div className="h2"> Umowy Premium </div>
                                    <Col xs="12" md="12" className="mb-4 ">
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
                                        <TabContent activeTab={this.state.activeTab1}  className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 15)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 17)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 16)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 18)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 20)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 19)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 21)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 23)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 22)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 6)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 8)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 7)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferTeam(user_card, 9)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferTeam(user_card, 11)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 10)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferAdvicer(user_card, 1)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferAdvicer(user_card, 0)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 2)}
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
                                        <TabContent activeTab={this.state.activeTab1} className="border-danger" style={styleBlackText}>
                                            <TabPane tabId="1">
                                                { this.getTopOfferAdvicer(user_card, 5)}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.getTopOfferAdvicer(user_card, 4)}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.getTopOfferAdvicer(user_card, 3)}
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }
}
TopEmmerson.propTypes = propTypes;
export default TopEmmerson;