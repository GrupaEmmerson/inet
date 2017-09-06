import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    CardBlock,
    Label,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    FormText,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from "reactstrap";
import {Doughnut} from "react-chartjs-2";
import classnames from "classnames";

const zrob = 75;
const zrob2 = 95;

const stylemain = {textAlign: 'center'};
const styleBlackText = {color: 'black'};

class WorkersList extends Component{

    // componentWillMount() {
    //     this.props.getTopEmmersonMonthOffer();
    //     this.props.getTopEmmersonYearOffer();
    //     this.props.getNewsLatest();
    // }

    constructor(props) {
        super(props);

    }

    // getManager(manager){
    //     return(
    //         <h2>
    //             <img src={'https://inet.emmerson.pl/'+ manager.photoUrl} alt="Brak" /><br/>
    //             {manager.name}
    //         </h2>
    //     )
    // }
    // getNews(news){
    //     const regex = /(<([^>]+)>)/ig;
    //     return(
    //         <Col xs="12" sm="12" md="6">
    //             <Widget02 header={news.title} mainText={news.text.replace(regex,"").substring(0, 300) + "..."} icon="fa fa-cogs" color="primary" footer link="#/workers_list"/>
    //         </Col>
    //     )
    // }

    render(){
        // console.log(this.props.top_emmerson_month_offer);
        // console.log(this.props.top_emmerson_year_offer);
        return (
            <div >
                <Card className="border-success">
                    <CardBlock className="card-body">
                        <Row style={stylemain}>
                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Imię i Nazwisko</a>
                                <Input type="text" id="text-input" name="text-input" placeholder=""/>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Firma</a>
                                <Input type="select" name="select" id="select">
                                    <option value="0">---Nie wybrano---</option>
                                    <option value="1">Option #1</option>
                                    <option value="2">Option #2</option>
                                    <option value="3">Option #3</option>
                                </Input>
                            </Col>
                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Dział</a>
                                <Input type="select" name="select" id="select">
                                    <option value="0">---Nie wybrano---</option>
                                    <option value="1">Option #1</option>
                                    <option value="2">Option #2</option>
                                    <option value="3">Option #3</option>
                                </Input>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Telefon Komórkowy</a>
                                <Input type="text" id="text-input" name="text-input" placeholder=""/>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Oddział</a>
                                <Input type="select" name="select" id="select">
                                    <option value="0">---Nie wybrano---</option>
                                    <option value="1">Option #1</option>
                                    <option value="2">Option #2</option>
                                    <option value="3">Option #3</option>
                                </Input>
                            </Col>
                            <Col xs="12" sm="6" md="4">
                                <br/>
                                <a>Zespół</a>
                                <Input type="select" name="select" id="select">
                                    <option value="0">---Nie wybrano---</option>
                                    <option value="1">Option #1</option>
                                    <option value="2">Option #2</option>
                                    <option value="3">Option #3</option>
                                </Input>
                            </Col>
                        </Row>
                    </CardBlock>
                    <CardFooter style={stylemain}>
                        <Button color="primary"><i className="fa fa-search"></i> Szukaj </Button>
                    </CardFooter>
                </Card>
                <Col xs="12">Wyświetlone 1-35 z wielu rekordów</Col>

                <Col xs="12">
                    <Card className="card-accent-secondary">
                        <CardHeader>
                            Imię i nazwisko
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12" sm="2">Zdjęcie</Col>
                                <Col xs="12" sm="10">

                                    <Row>
                                        <Col xs="12">
                                            <Row>
                                                <Col xs="3">Stanowisko:</Col><Col xs="9">Prezes Zarządu Grupy Emmerson </Col>
                                                <Col xs="3">Firma:</Col><Col xs="9">xxx </Col>
                                                <Col xs="3">Dział:</Col><Col xs="9">xxx </Col>
                                                <Col xs="3">Oddział:</Col><Col xs="9">xxx </Col>
                                                <Col xs="3">Zespół:</Col><Col xs="9">xxx </Col>
                                                <Col xs="12"><br/></Col>
                                                <Col xs="3">E-mail:</Col><Col xs="9">xxx </Col>
                                                <Col xs="3">Telefon stacjonarny:</Col><Col xs="9">xxx </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Card className="card-accent-secondary" />

                                </Col>
                            </Row>
                        </CardBlock>
                    </Card>
                </Col>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        // top_emmerson_month_offer: state.top_emmerson_month_offer.top_emmerson_month_offer,
        // top_emmerson_year_offer: state.top_emmerson_year_offer.top_emmerson_year_offer,
        // news_latest: state.news_latest.news_latest
    }
}

WorkersList.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(WorkersList);