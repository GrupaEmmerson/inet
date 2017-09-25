import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Badge, Row, Col, Card, CardHeader, CardBlock, Table, Pagination, PaginationItem,
    PaginationLink, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardFooter,
    Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from "reactstrap";
import SearchInput, {createFilter} from 'react-search-input';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
let testWeakMap = new WeakMap();
const KEYS_TO_FILTERS = ['name', 'team_id', 'id'];
const KEYS_TO_FILTERS_TEAMS = ['users.name', 'team_name', 'team_id', 'users.id'];
const KEYS_TO_FILTERSC_PLANNED = ['planned_id', 'name'];
const KEYS_TO_FILTERSC_EVENT = ['event_id', 'name'];
const KEYS_TO_FILTERS_COUNT = ['count_id'];
const KEYS_TO_FILTERS_OFFER = ['offer_id'];
import LoadingBar from 'react-redux-loading-bar'

class OfficeWorkCreate extends Component {

    componentWillMount(){
        this.props.getUsersGroupByTeams();
        this.props.getPoszukiwanieOferta();
    }

    constructor () {
        super();
        this.renderEventOptions = this.renderEventOptions.bind(this);
        this.renderTransactionOptions = this.renderTransactionOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
        this.searchUpdatedChoice = this.searchUpdatedChoice.bind(this);
        this.eventTransactionChoice = this.eventTransactionChoice.bind(this);
        this.optionsResult = this.optionsResult.bind(this);
        this.PlannedTransactionChoice = this.PlannedTransactionChoice.bind(this);
        this.countInput = this.countInput.bind(this);
        this.offerInput = this.offerInput.bind(this);
        this.state = { searchTerm: '', plannedTransactionChoices: '0', plannedTransactionChoice: '0', choiceTransaction: '0', countChoice: '0', offerChoice: '0', startDate: moment()};
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    searchUpdated (term) {
        this.setState({ searchTerm: term });
    }

    searchUpdatedChoice (term)
    {

        if(term)
        {
            const str1 = this.state.searchTerm;
            const str2 = ' ';
            const str3 = str1.concat(str2);
            this.setState({ searchTerm: str3.concat(term.target.value) });
        }
        else
        {
            this.setState({ searchTerm: term.target.value });
        }
    }

    PlannedTransactionChoice(term) {
        this.setState({ choiceTransaction: '0'});
        this.setState({ plannedTransactionChoice: '0'});
        this.setState({ countChoice: '0'});
        this.setState({ offerChoice: '0'});
        this.setState({ plannedTransactionChoices: term.target.value });
    }

    eventTransactionChoice(termP) {

        this.setState({ choiceTransaction: termP.target.value });
        this.setState({ countChoice: termP.target.value });
        this.setState({ offerChoice: termP.target.value });
        this.setState({ plannedTransactionChoice: termP.target.value });

    }

    optionsResult(e)
    {
        return(
            <option value={e.id}>{e.name}</option>
        );
    }

    renderTransactionOptions(result){
        if(!result){
            return(<div> </div>);
        }

        return(
            <Col xs="3">
                <FormGroup>
                    <select className="form-control"  placeholder="Wyszukaj" size="9" value={this.state.plannedTransactionChoice} onChange={this.eventTransactionChoice}>
                        {result.value.map(this.optionsResult)}
                    </select>
                </FormGroup>
            </Col>
        );

    }

    renderEventOptions(result){
        if(!result){
            return(<div> </div>);
        }
        return(
            <Col xs="3">
                <FormGroup>
                    <select className="form-control" placeholder="Wyszukaj" size="9">
                        {result.value.map(this.optionsResult)}
                    </select>
                </FormGroup>
            </Col>
        );

    }

    countInput(result){
            if(!result){
                return(
                    <Col xs="3">
                        <FormGroup row>
                            <Col md="12">
                                <InputGroup>
                                    <InputGroupAddon>Ilość prezentacji</InputGroupAddon>
                                    <Input type="select" className="form-control" disabled>
                                        <option value="0">0</option>
                                    </Input>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </Col>
                 );
            }

            return(
                <Col xs="3">
                    <FormGroup row>
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon>Ilość prezentacji</InputGroupAddon>
                                <Input type="select" className="form-control"  >
                                    {result.value.map(e => {
                                        return(
                                            <option value={e.id}>{e.id}</option>
                                        );
                                    })}
                                </Input>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </Col>
            );
    }

    offerInput(result){
        if(!result){
            return (<div> </div>);
        }
        return(
            <Col xs="3">
                <FormGroup row>
                    <Col md="12">
                        <InputGroup>
                            <Input type="text" className="form-control" placeholder="Prowizja" />
                            <InputGroupAddon>%</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
            </Col>
        );
    }

    render() {
        if(!this.props.users){
            return <div>Loading...</div>
        }

        const formResultUsers = this.props.users.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const formResultTeams = this.props.users.teams.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS_TEAMS));
        const formResultTransaction = this.props.offer_search.offer_search.planowana_transakcja.filter(createFilter(this.state.plannedTransactionChoices, KEYS_TO_FILTERSC_PLANNED));
        const formResultEvent = this.props.offer_search.offer_search.zdarzenie.filter(createFilter(this.state.choiceTransaction, KEYS_TO_FILTERSC_EVENT));
        const formResultCount = this.props.offer_search.offer_search.counting.filter(createFilter(this.state.countChoice, KEYS_TO_FILTERS_COUNT));
        const formResultOffer = this.props.offer_search.offer_search.umowa.filter(createFilter(this.state.offerChoice, KEYS_TO_FILTERS_OFFER));

        return (

            <div className="animated fadeIn">
                <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} showFastActions />
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <strong>Praca</strong>
                            <small> operacyjna</small>
                        </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12">
                                    <SearchInput inputClassName="form-control"  placeholder="Wyszukaj" onChange={this.searchUpdated}/>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input type="select" name="user" id="user" onChange={this.searchUpdatedChoice}>
                                            {formResultUsers.map(e => {
                                                        return(
                                                            <option value={e.id}>{e.name}</option>
                                                        );
                                                    }
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input type="select" name="team" id="team">
                                            {formResultTeams.map(e => {
                                                        return(
                                                            <option value={e.team_id}>{e.team_name}</option>
                                                        );
                                                    }
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="3">
                                    <FormGroup>
                                        <select className="form-control" placeholder="Wyszukaj" size="9" onChange={this.PlannedTransactionChoice}>
                                            <option value="0">Wybierz rodzaj</option>
                                            <option value="1">Kupno</option>
                                            <option value="2">Sprzedaż</option>
                                            <option value="3">Najem</option>
                                            <option value="4">Wynajem</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                {formResultTransaction.map(this.renderTransactionOptions)}

                                {formResultEvent.map(this.renderEventOptions)}
                            </Row>
                            <Row>
                                <Col xs="3">
                                    <DatePicker
                                        className='form-control'
                                        placeholderText="Podaj datę"
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col xs="3">
                                    <FormGroup>
                                        <Input type="text" className="form-control"  placeholder="Symbol" />
                                    </FormGroup>
                                </Col>
                                {formResultCount.map(this.countInput)}
                                {formResultOffer.map(this.offerInput)}
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
        users: state.users.users,
        offer_search: state.offer_search.offer_search
    }
}

OfficeWorkCreate.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};

export default connect(mapStateToProps, actions)(OfficeWorkCreate);