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
const KEYS_TO_FILTERS = ['name', 'team_name', 'id'];
const KEYS_TO_FILTERSC_PLANNED = ['planned_id', 'name'];
const KEYS_TO_FILTERSC_EVENT = ['event_id', 'name'];

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
        this.state = { searchTerm: '', plannedTransactionChoices: '0', plannedTransactionChoice: '0', choiceTransaction: '0', startDate: moment()};
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

    PlannedTransactionChoice(term) {

        if(parseInt(term.target.value) !== this.state.plannedTransactionChoices){
            this.setState({ choiceTransaction: '0'});
            this.setState({ plannedTransactionChoice: '0'});
            this.setState({ plannedTransactionChoices: term.target.value });
        }else{
            this.setState({ plannedTransactionChoices: term.target.value });
        }

    }

    eventTransactionChoice(termP) {

        this.setState({ choiceTransaction: termP.target.value });
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
                    <Input type="select" className="form-control"  placeholder="Wyszukaj" size="9" value={this.state.plannedTransactionChoice} onChange={this.eventTransactionChoice.bind(this)}>
                        {result.value.map(this.optionsResult)}
                    </Input>
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
                    <Input type="select" className="form-control" placeholder="Wyszukaj" size="9">
                        {result.value.map(this.optionsResult.bind(this))}
                    </Input>
                </FormGroup>
            </Col>
        );

    }

    countInput(e){

        if(e !== 2){
            return(<div> </div>);
        }
        else
        {
            return(
                <Col xs="3">
                    <FormGroup row>
                        <Col md="12">
                            <InputGroup>
                                <InputGroupAddon>Ilość prezentacji</InputGroupAddon>
                                <Input type="select" className="form-control" >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </Input>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </Col>
            );
        }

    }

    render() {
        if(!this.props.users){
            return <div>Loading...</div>
        }

        const formResult = this.props.users.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const formResultTransaction = this.props.offer_search.offer_search.planowana_transakcja.filter(createFilter(this.state.plannedTransactionChoices, KEYS_TO_FILTERSC_PLANNED));
        const formResultEvent = this.props.offer_search.offer_search.zdarzenie.filter(createFilter(this.state.choiceTransaction, KEYS_TO_FILTERSC_EVENT));

        console.log(this.state.plannedTransactionChoice);
        console.log(this.state.choiceTransaction);
        console.log(formResultTransaction);
        console.log(formResultEvent);
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
                                    <SearchInput inputClassName="form-control"  placeholder="Wyszukaj" onChange={this.searchUpdated.bind(this)}/>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs="4">
                                    <FormGroup>
                                        <Input type="select" name="user" id="user">
                                            {formResult.map(e => {
                                                        return(
                                                            <option value={e.id}>{e.name}</option>
                                                        );
                                                    }
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs="4">
                                    <FormGroup>
                                        <Input type="select" name="team" id="team">
                                            {formResult.map(e => {
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
                                        <Input type="select" className="form-control"  placeholder="Wyszukaj" size="9" onChange={this.PlannedTransactionChoice.bind(this)}>
                                            <option value="0">Wybierz rodzaj</option>
                                            <option value="1">Kupno</option>
                                            <option value="2">Sprzedaż</option>
                                            <option value="3">Najem</option>
                                            <option value="4">Wynajem</option>
                                        </Input>
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
                                {this.countInput(this.state.choiceTransaction)}
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