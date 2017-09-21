import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Badge, Row, Col, Card, CardHeader, CardBlock, Table, Pagination, PaginationItem,
    PaginationLink, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardFooter,
    Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from "reactstrap";
import SearchInput, {createFilter} from 'react-search-input'
let testWeakMap = new WeakMap();
const KEYS_TO_FILTERS = ['name', 'team_name', 'id'];

class OfficeWorkCreate extends Component {

    componentWillMount(){
        this.props.getUsersGroupByTeams();
        this.props.getPoszukiwanieOferta();
    }

    constructor () {
        super();
        this.state = { searchTerm: '', searchPlannedTransactionChoice: '', searchEventChoice: ''};
    }
    get state () {
        return testWeakMap.get(this);
    }
    set state (value) {
        testWeakMap.set(this, value);
    }

    searchUpdated (term) {
        this.setState({ searchTerm: term });
    }

    plannedTransaction(term) {
        this.fetchPlannedTransactionSearch(term.target.value);
    }

    event(term){
        this.fetchEventSearch(term.target.value)
    }

    fetchPlannedTransactionSearch(plan){
            const filtered_data = this.props.offer_search.offer_search.planowana_transakcja.filter( e =>
                {
                    return (
                        e.id ===  parseInt(plan)
                    );
                }
            );
            this.setState({ searchPlannedTransactionChoice: filtered_data });
    }

    fetchEventSearch(plan){
        const filtered_data = this.props.offer_search.offer_search.zdarzenie.filter( e =>
            {
                return (
                    e.id ===  parseInt(plan)
                );
            }
        );
        this.setState({ searchEventChoice: filtered_data });
    }

    plannedTransactionChoiceInput(){
        if(!this.state.searchPlannedTransactionChoice){
            return(<div> </div>);
        }
        return(
            <Col xs="4">{this.state.searchPlannedTransactionChoice.map(this.renderPlannedTransactionInput)}</Col>
        );
    }

    eventChoiceInput(){
        if(!this.state.searchEventChoice){
            return(<div> </div>);
        }
        console.log(this.state.searchEventChoice);
        return(
            <Col xs="4">{this.state.searchEventChoice.map(this.renderEventInput)}</Col>
        );
    }

    static renderEventInput(formChoice){
        return(
            <FormGroup>
                <Input type="select" name="oferta_poszukiwanie" id="offer_search">
                    {formChoice.value.map
                    (e =>
                        {
                            return(
                                <option value={e.id}>{e.name}</option>
                            );
                        }
                    )
                    }
                </Input>
            </FormGroup>
        );
    }

    static renderPlannedTransactionInput(formChoice){
        return(
                <FormGroup>
                    <Input type="select" name="oferta_poszukiwanie" id="offer_search" onChange={this.event.bind(this)}>
                        {formChoice.value.map
                            (e =>
                                {
                                    return(
                                        <option value={e.id}>{e.name}</option>
                                    );
                                }
                            )
                        }
                    </Input>
                </FormGroup>
        );
    }


    render() {
        if(!this.props.users){
            return <div>Loading...</div>
        }
        const formResult = this.props.users.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        console.log(this.props.users);
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
                                <Col xs="4">
                                    <FormGroup>
                                        <Input type="select" name="planowana_transakcja" id="planowana_transakcja" onChange={this.plannedTransaction.bind(this)}>
                                            <option value="0">Wybierz rodzaj</option>
                                            <option value="1">Kupno</option>
                                            <option value="2">Sprzedaż</option>
                                            <option value="3">Najem</option>
                                            <option value="4">Wynajem</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {this.plannedTransactionChoiceInput()}
                            </Row>
                            <row>
                                {this.eventChoiceInput()}
                            </row>
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