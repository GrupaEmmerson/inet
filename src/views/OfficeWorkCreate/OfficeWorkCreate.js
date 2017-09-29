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
        this.searchUpdatedTeams = this.searchUpdatedTeams.bind(this);
        this.searchUpdatedChoice = this.searchUpdatedChoice.bind(this);
        this.eventTransactionChoice = this.eventTransactionChoice.bind(this);
        this.optionsResult = this.optionsResult.bind(this);
        this.PlannedTransactionChoice = this.PlannedTransactionChoice.bind(this);
        this.countInput = this.countInput.bind(this);
        this.offerInput = this.offerInput.bind(this);
        this.state = {
            searchTerm: '',
            plannedTransactionChoices: '0',
            plannedTransactionValue: '0',
            eventTransactionChoice: '0',
            countChoice: '0',
            offerChoice: '0',
            startDate: moment()
        };
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

    searchUpdatedTeams (term) {
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

    searchUpdatedChoice (term){
        if(term)
        {
            const str1 = this.state.searchTerm;
            const str2 = ' ';
            const str3 = str1.concat(str2);
            const str4 = str3.concat(term.target.value);
            const str5 = ' ';

            this.setState({ searchTerm: str4.concat(str5) });
        }
        else
        {
            this.setState({ searchTerm: term.target.value });
        }
    }

    PlannedTransactionChoice(term) {
        this.setState({ eventTransactionChoice: '0'});
        this.setState({ plannedTransactionValue: '0'});
        this.setState({ countChoice: '0'});
        this.setState({ offerChoice: '0'});
        this.setState({ plannedTransactionChoices: term.target.value });
    }

    eventTransactionChoice(termP) {

        this.setState({ eventTransactionChoice: termP.target.value });
        this.setState({ countChoice: termP.target.value });
        this.setState({ offerChoice: termP.target.value });
        this.setState({ plannedTransactionValue: termP.target.value });

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
                    <select className="form-control" name={result.field_name} placeholder="Wyszukaj" size="9" value={this.state.plannedTransactionValue} onChange={this.eventTransactionChoice}>
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
                    <select className="form-control" placeholder="Wyszukaj" size="9" name={result.field_name} >
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
                                    <Input type="select" className="form-control" name={result.field_name} disabled>
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
                                <Input type="select" className="form-control" name={result.field_name}>
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
                            <Input type="text" className="form-control" placeholder="Prowizja" name={result.field_name} />
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
        const formResultTransaction = this.props.offer_search.offer_search.planned_transaction.filter(createFilter(this.state.plannedTransactionChoices, KEYS_TO_FILTERSC_PLANNED));
        const formResultEvent = this.props.offer_search.offer_search.event.filter(createFilter(this.state.eventTransactionChoice, KEYS_TO_FILTERSC_EVENT));
        const formResultCount = this.props.offer_search.offer_search.counting.filter(createFilter(this.state.countChoice, KEYS_TO_FILTERS_COUNT));
        const formResultOffer = this.props.offer_search.offer_search.provision.filter(createFilter(this.state.offerChoice, KEYS_TO_FILTERS_OFFER));

        return (

            <div className="animated fadeIn">
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
                                        <Input type="select" name="zespol" id="team" onChange={this.searchUpdatedTeams}>
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
                                        <select className="form-control" name="planowana_transakcja" placeholder="Wyszukaj" size="9" onChange={this.PlannedTransactionChoice}>
                                            <option value="0">Wybierz Rodzaj</option>
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
                                        name="date"
                                    />
                                </Col>
                                <Col xs="3">
                                    <FormGroup>
                                        <Input type="text" className="form-control" name="symbol"  placeholder="Symbol" />
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