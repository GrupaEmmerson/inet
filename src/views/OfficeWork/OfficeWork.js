import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchInput, {createFilter} from 'react-search-input'
let testWeakMap = new WeakMap();
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardFooter,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from "reactstrap";

const KEYS_TO_FILTERS = ['symbol'];

class OfficeWork extends Component {

    componentWillMount(){
        this.props.getOfficeWork();

    }

    constructor () {
        super();
        this._state = { searchTerm: '' };
    }
    get _state () {
        return testWeakMap.get(this);
    }
    set _state (value) {
        testWeakMap.set(this, value);
    }
    searchUpdated (term) {
       this._state({ searchTerm: term });
    }

    render() {

        if(!this.props.office_work){
            return <div>Loading Office Work...</div>
        }
        console.log(this.props.office_work.filter(createFilter(this._state.searchTerm, KEYS_TO_FILTERS)));
        const filteredEmails = this.props.office_work.filter(createFilter(this._state.searchTerm, KEYS_TO_FILTERS));
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardBlock className="card-body">
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <SearchInput className='search-input' onChange={this.searchUpdated} />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </CardBlock>
                </Card>

                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="icon-speedometer"></i> Praca Operacyjna
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Imię i nazwisko</th>
                                        <th>Zespół</th>
                                        <th>Rodzaj planowanej transakcji</th>
                                        <th>Zdarzenie</th>
                                        <th>Umowa</th>
                                        <th>Prezentacja</th>
                                        <th>Symbol</th>
                                        <th>Data</th>
                                        <th>Edytuj</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {filteredEmails.map(office_work => {
                                        return (
                                            <tr key={office_work.id}>
                                                <td>{office_work.name}</td>
                                                <td>{office_work.team_name}</td>
                                                <td> -</td>
                                                <td> -</td>
                                                <td> -</td>
                                                <td> -</td>
                                                <td>{office_work.symbol}</td>
                                                <td>{office_work.date}</td>
                                                <td><a href="#" className="btn btn-primary"><span className="icon-pencil"/></a></td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }

}

function mapStateToProps(state){
    console.log(state.office_work);
    return { office_work: state.office_work.office_work }
}

OfficeWork.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(OfficeWork);