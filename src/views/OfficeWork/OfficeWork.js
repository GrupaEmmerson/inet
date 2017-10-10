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
import { TablePagination } from 'react-pagination-table';

const KEYS_TO_FILTERS = ['symbol', 'user', 'team_name', 'data', 'id', 'kind', 'event', 'plannedTransaction', 'offer', 'presentation'];

class OfficeWork extends Component {

    componentWillMount(){
        this.props.getOfficeWork();

    }

    constructor () {
        super();
        this.state = { searchTerm: '' };
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

    render() {

        if(!this.props.office_work){
            return <div>Loading Office Work...</div>
        }
        console.log(this.props.office_work.office_work.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)));
        const filteredEmails = this.props.office_work.office_work.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const Header = [
            "Imię i nazwisko",
            "Zespół",
            "Planowana Transakcja",
            "Rodzaj",
            "Zdarzenie",
            "Umowa",
            "Prezentacja",
            "Prowizja",
            "Symbol",
            "Ilość",
            "Data",
            "Edytuj"
        ];
        var totalCount = filteredEmails.length/10 <= 20 ? filteredEmails.length/10 : filteredEmails.length/20;
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardBlock className="card-body">
                        <Form>
                            <FormGroup>
                                    <Col md="12">
                                        <SearchInput inputClassName="form-control"  placeholder="Wyszukaj" onChange={this.searchUpdated.bind(this)}/>
                                    </Col>
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
                                <TablePagination
                                    className="table-bordered table-striped table-condensed"
                                    headers={ Header }
                                    data={ filteredEmails }
                                    columns="user.team_name.plannedTransaction.kind.event.offer.presentation.provision.symbol.count.data.edit"
                                    nextPageText="Następna"
                                    prePageText="Poprzednia"
                                    perPageItemCount={ 20 }
                                    paginationClassName="pagination"
                                    totalCount={ totalCount }
                                    arrayOption={ [["size", 'all', ' ']] }
                                />
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { office_work: state.office_work.office_work }
}

OfficeWork.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(OfficeWork);