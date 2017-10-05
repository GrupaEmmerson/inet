import React, {Component} from "react";
import { reduxForm, Field, change as changeFieldValue } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader, CardBlock, Form, FormGroup, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
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

    constructor () {

        super();
        this.handleChange = this.handleChange.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
        this.searchUpdatedTeams = this.searchUpdatedTeams.bind(this);
        this.searchUpdatedChoice = this.searchUpdatedChoice.bind(this);
        this.eventTransactionChoice = this.eventTransactionChoice.bind(this);
        this.optionsResult = this.optionsResult.bind(this);
        this.PlannedTransactionChoice = this.PlannedTransactionChoice.bind(this);
        this.state = {

            searchTerm: '',
            plannedTransactionChoices: '0',
            eventTransactionChoice: '0',
            countChoice: '0',
            offerChoice: '0',
            startDate: moment()
        };
    }

    componentWillMount(){
        this.props.getPoszukiwanieOferta();
        this.props.getUsersGroupByTeams();
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    handleChange(date) {
        this.setState({
            startDate: moment(date)
        });
    }

    searchUpdated (term) {
        this.setState({ searchTerm: term });
        const formResultUsers = this.props.users.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        this.props.dispatch(changeFieldValue("office_work", "user", formResultUsers[0].id));
        this.props.dispatch(changeFieldValue("office_work", "team", formResultUsers[0].team_id));

    }


    searchUpdatedTeams (term) {
        if(!term.target)
        {
            this.setState({ teamValue: term });
        }
        else
        {
            const str1 = this.state.searchTerm;
            const str2 = ' ';
            const str3 = str1.concat(str2);
            this.setState({ searchTerm: str3.concat(term.target.value) });
            this.setState({ teamValue: term.target.value });

        }
    }

    searchUpdatedChoice (term){
        if(!term.target)
        {
            this.setState({ userValue: term });
        }
        else
        {
            const str1 = this.state.searchTerm;
            const str2 = ' ';
            const str3 = str1.concat(str2);
            const str4 = str3.concat(term.target.value);
            const str5 = ' ';

            this.setState({ searchTerm: str4.concat(str5) });
            this.setState({ userValue: term.target.value });
        }
    }

    PlannedTransactionChoice(term) {
        this.setState({ eventTransactionChoice: '0'});
        this.setState({ countChoice: '0'});
        this.setState({ offerChoice: '0'});
        this.props.dispatch(changeFieldValue("office_work", "event", null));
        this.props.dispatch(changeFieldValue("office_work", "offer", null));
        this.props.dispatch(changeFieldValue("office_work", "provision", null));
        this.props.dispatch(changeFieldValue("office_work", "count", 1));
        this.props.dispatch(changeFieldValue("office_work", "presentation", null));
        this.setState({ plannedTransactionChoices: term.target.value });
        this.setState({ plannedTransactionValue: term.target.value});

    }

    eventTransactionChoice(termP) {
        this.setState({ eventTransactionChoice: termP.target.value });
        this.setState({ countChoice: termP.target.value });
        this.setState({ offerChoice: termP.target.value });
        this.props.dispatch(changeFieldValue("office_work", "offer", null));
        this.props.dispatch(changeFieldValue("office_work", "provision", null));
        this.props.dispatch(changeFieldValue("office_work", "count", 1));
        this.props.dispatch(changeFieldValue("office_work", "presentation", null));
    }

    optionsResult(e)
    {
        return(
            <option value={e.id}>{e.name}</option>
        );
    }

    handleFormSubmit(formProps){
       this.props.dispatch(actions.createOfficeWork(formProps))
    }

    render() {
        if(!this.props.users){
            return <div>Loading...</div>
        }

        const {
            handleSubmit,
            fields:{
                user,
                team,
                plannedTransaction,
                event,
                offer,
                presentation,
                symbol,
                provision,
                date,
                count
            }
        } = this.props;

        const formResultUsers = this.props.users.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const formResultTeams = this.props.users.teams.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS_TEAMS));
        const formResultTransaction = this.props.offer_search.offer_search.planned_transaction.filter(createFilter(this.state.plannedTransactionChoices, KEYS_TO_FILTERSC_PLANNED));
        const formResultEvent = this.props.offer_search.offer_search.event.filter(createFilter(this.state.eventTransactionChoice, KEYS_TO_FILTERSC_EVENT));
        const formResultCount = this.props.offer_search.offer_search.counting.filter(createFilter(this.state.countChoice, KEYS_TO_FILTERS_COUNT));
        const formResultOffer = this.props.offer_search.offer_search.provision.filter(createFilter(this.state.offerChoice, KEYS_TO_FILTERS_OFFER));

        const renderDateTimePicker = ({ input: { onChange, value, className, placeholderText }, showTime }) =>
            <DatePicker
                className={className}
                onChange={onChange}
                dateFormat="YYYY-MM-DD"
                value={!value ? placeholderText : new Date(value)}
                selected={!value ? placeholderText : value}
            />;

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
                            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Field component="select" name="user" className="form-control" placeholder="Wyszukaj">
                                                {formResultUsers.map(e => {
                                                            return(
                                                                <option value={e.id}>{e.name}</option>
                                                            );
                                                        }
                                                    )

                                                }
                                            </Field>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Field component="select" name="team" className="form-control" placeholder="Wyszukaj">
                                                {formResultTeams.map(e => {
                                                        return(
                                                                <option value={e.team_id}>{e.team_name}</option>
                                                            );
                                                        }
                                                    )
                                                }
                                            </Field>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Field component="select" className="form-control" name="plannedTransaction" placeholder="Wyszukaj" size="9" onChange={this.PlannedTransactionChoice}>
                                                <option value="0">Wybierz Rodzaj</option>
                                                <option value="1">Kupno</option>
                                                <option value="2">Sprzedaż</option>
                                                <option value="3">Najem</option>
                                                <option value="4">Wynajem</option>
                                            </Field>
                                        </FormGroup>
                                    </Col>

                                    {formResultTransaction.map( result => {

                                        if(!result){
                                            return(<div> </div>);
                                        }

                                        return(
                                            <Col xs="3">
                                                <FormGroup>
                                                    <Field component="select" className="form-control" name="event" placeholder="Wyszukaj" size="9" onChange={this.eventTransactionChoice}>
                                                        {result.value.map(this.optionsResult)}
                                                    </Field>
                                                </FormGroup>
                                            </Col>
                                        );

                                    })}

                                    {formResultEvent.map(result => {

                                        if(!result){
                                            return(<div> </div>);
                                        }
                                        if(result.field_name === 'offer'){
                                            return(
                                                <Col xs="3">
                                                    <FormGroup>
                                                        <Field component="select" className="form-control" placeholder="Wyszukaj" size="9" name="offer">
                                                            {result.value.map(this.optionsResult)}
                                                        </Field>
                                                    </FormGroup>
                                                </Col>
                                            );
                                        }
                                        else {
                                            return(
                                                <Col xs="3">
                                                    <FormGroup>
                                                        <Field component="select" className="form-control" placeholder="Wyszukaj" size="9" name="presentation">
                                                            {result.value.map(this.optionsResult)}
                                                        </Field>
                                                    </FormGroup>
                                                </Col>
                                            );
                                        }
                                    })}
                                </Row>
                                <Row>
                                    <Col xs="3">
                                        <Field
                                            name="date"
                                            component={renderDateTimePicker}
                                            className="form-control"
                                            placeholderText="Podaj datę"
                                        />
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Field component="input" type="text" className="form-control" placeholder="Symbol" name="symbol" />
                                        </FormGroup>
                                    </Col>
                                    {formResultCount.map(result => {

                                        if(!result){
                                            return(<div> </div>);
                                        }


                                        return(
                                            <Col xs="3">
                                                <FormGroup row>
                                                    <Col md="12">
                                                        <InputGroup>
                                                            <InputGroupAddon>Ilość prezentacji</InputGroupAddon>
                                                            <Field component="select" className="form-control" placeholder="Wybierz" name="count">
                                                                {result.value.map(e => {
                                                                    return(
                                                                        <option value={e.id}>{e.id}</option>
                                                                    );
                                                                })}
                                                            </Field>
                                                        </InputGroup>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        );
                                    })}

                                    {formResultOffer.map(result => {

                                        if(!result){
                                            return (<div> </div>);
                                        }
                                        return(
                                            <Col xs="3">
                                                <FormGroup row>
                                                    <Col md="12">
                                                        <InputGroup>
                                                            <Field component="input" type="text" className="form-control" placeholder="Prowizja" name="provision" />
                                                            <InputGroupAddon>%</InputGroupAddon>
                                                        </InputGroup>
                                                    </Col>
                                                </FormGroup>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                <Col xs="6">
                                    <Button color="primary" className="px-4" action="submit">Zapisz</Button>
                                </Col>
                            </Form>
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

OfficeWorkCreate = connect(
    mapStateToProps,
    actions
)(OfficeWorkCreate);

export default OfficeWorkCreate = reduxForm({
    form: 'office_work',
    fields:
        [
            'user',
            'team',
            'plannedTransaction',
            'event',
            'offer',
            'presentation',
            'symbol',
            'provision',
            'date',
            'count'
        ]
})(OfficeWorkCreate);
