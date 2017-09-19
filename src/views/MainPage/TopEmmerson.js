import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import classnames from "classnames";

const stylemain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};
const stylesecond = {textAlign: 'left', float: 'left', lineHeight: '1.15'};
const styleBlackText = {color: 'black'};
const stylePhoto = {height: '146px', float: 'right'};
const styleRedText = {color: 'red'};
const styleTopTitle = {fontSize: '23'};
const styleTopSecendary = {fontSize: '13'};

class TopEmmerson extends Component {

    componentWillMount(){
        this.props.getUserCard();
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

    getTopOfferAdvicer (advicer){
        return(
            <span>
                <Row>
                <Col xs="11" style={stylesecond}>
                    <h1><br/></h1>
                    <table>
                        <tbody>
                        <tr><td ><span style={styleTopTitle}><b>{advicer.name} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>ZESPÓŁ {advicer.profiles[0].team} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>-DZIAŁ ? </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>STANOWISKO {advicer.profiles[0].jobTitle} </b></span></td></tr>
                        <tr><td> <br/></td></tr>
                        <tr><td> {advicer.profiles[0].company} <br/>
                            {advicer.profiles[0].branchAddress}, {advicer.profiles[0].branchZipCode} {advicer.profiles[0].branchCity}  <br/>
                            tel. kom. {advicer.mobile} <br/>
                            tel. {advicer.phone} <br/>
                            e-mail: {advicer.profiles[0].email} <br/>
                        <span style={styleRedText}><b>{advicer.profiles[0].companyUrl}</b></span></td></tr>
                        </tbody>
                    </table>
                </Col>
                <Col xs="1">
                    <img src={! advicer.photo  ?  'https://inet.emmerson.pl/images/icons/1.png' : advicer.photo ? 'https://inet.emmerson.pl/'+ advicer.photo :  'https://inet.emmerson.pl/images/icons/1.png'} alt="Brak"  style={stylePhoto} />
                </Col>
                </Row>
            </span>
        );
    }

    getTopOfferTeam (advicer){
        return(
            <span>
                <Row>
                <Col xs="11" style={stylesecond}>
                    <h1><br/></h1>
                    <table>
                        <tbody>
                        <tr><td ><span style={styleTopTitle}><b>{advicer.name} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>ZESPÓŁ {advicer.profiles[0].team} </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>-DZIAŁ ? </b></span></td></tr>
                        <tr><td><span style={styleTopSecendary}><b>STANOWISKO {advicer.profiles[0].jobTitle} </b></span></td></tr>
                        <tr><td> <br/></td></tr>
                        <tr><td> {advicer.profiles[0].company} <br/>
                            {advicer.profiles[0].branchAddress}, {advicer.profiles[0].branchZipCode} {advicer.profiles[0].branchCity}<br/>
                            tel. kom. {advicer.mobile} <br/>
                            tel. {advicer.phone} <br/>
                            e-mail: {advicer.profiles[0].email} <br/>
                        <span style={styleRedText}><b>{advicer.profiles[0].companyUrl}</b></span></td></tr>
                        </tbody>
                    </table>
                </Col>
                <Col xs="1">
                    <img src={! advicer.photo  ?  'https://inet.emmerson.pl/images/icons/1.png' : advicer.photo ? 'https://inet.emmerson.pl/'+ advicer.photo :  'https://inet.emmerson.pl/images/icons/1.png'} alt="Brak"  style={stylePhoto} />
                </Col>
                </Row>
            </span>
        );
    }

    render() {
        // console.log(this.props.user_card);

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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[12].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[14].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[13].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[15].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[17].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[16].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[18].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[20].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[19].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[21].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[23].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[22].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[6].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[8].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[7].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[9].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferTeam(this.props.user_card[11].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[10].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[1].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[2].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[0].businessCard) : ''}
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
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[4].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[5].businessCard) : ''}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                { this.props.user_card ? this.getTopOfferAdvicer(this.props.user_card[3].businessCard) : ''}
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
function mapStateToProps(state){
    return {
        user_card: state.user_card.user_card,
    }
}
TopEmmerson.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(TopEmmerson);