import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

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


class OfficeWork extends Component {

    componentWillMount(){
        this.props.getOfficeWork();
    }

    dataTable(office_work){
            return(
                <tr key={office_work.id}>
                    <td>{office_work.name}</td>
                    <td>{office_work.team_name}</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td>{office_work.symbol}</td>
                    <td>{office_work.date}</td>
                    <td><a href="#" className="btn btn-primary"><span className="icon-pencil"/></a></td>
                </tr>
            );
    };

    render() {

        if(!this.props.office_work){
            return <div>Loading Office Work...</div>
        }

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardBlock className="card-body">
                        <Form action="submit" >
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupButton>
                                        <Button color="primary"><i className="fa fa-search"></i> Szukaj</Button>
                                    </InputGroupButton>
                                    <Input type="text" id="input1-group2" name="input1-group2" placeholder="Symbol"/>
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
                                    { this.props.office_work.map(this.dataTable) }
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