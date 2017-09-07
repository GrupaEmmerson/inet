import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchInput, {createFilter} from 'react-search-input'
let testWeakMap = new WeakMap();
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
    InputGroupButton,
    Table
} from "reactstrap";
import classnames from "classnames";

const KEYS_TO_FILTERS = ['id','mobilePhoneNumber','name','phoneNumber','username','mobilePhoneNumber','internalPhoneNumber'];

const stylemain = {textAlign: 'center'};
const styleBlackText = {color: 'black'};
const stylePhoto = {width: '110px'};

class WorkersList extends Component{

    componentWillMount(){
        this.props.getUsers();

    }

    constructor() {
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
    checkPhotoUrl(url){
        if (url =='0') url='/images/icons/1.png';
        return url
    }

    render(){
        if(!this.props.users){
            return <div>Loading...</div>
        }
        console.log(this.props.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)));
        const filteredUsers = this.props.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const filteredUsersSmall = filteredUsers.slice(0,20);
        return (
            <div className="animated fadeIn">
                <Card className="border-success">
                    <CardBlock className="card-body">
                        <Col md="12">
                            <SearchInput inputClassName="form-control"  placeholder="Wyszukaj" onChange={this.searchUpdated.bind(this)}/>
                        </Col>
                    </CardBlock>
                </Card>
                <Col xs="12">Znaleziono {filteredUsers.length} z {this.props.users.length} wszystkich.</Col>
                <Col xs="12">
                    <Table responsive>
                        <tbody>
                        {filteredUsersSmall.map(users => {
                            return (
                                <tr key={users.id}>
                                    <td>
                                        <Card className="card-accent-secondary">
                                            <CardHeader>
                                                {users.name}
                                            </CardHeader>
                                            <CardBlock className="card-body">
                                                <Row>
                                                    <Col xs="12" sm="2"><img src={! users  ?  'https://inet.emmerson.pl/images/icons/1.png' : users.photoUrl ? 'https://inet.emmerson.pl/'+ this.checkPhotoUrl(users.photoUrl) :  'https://inet.emmerson.pl/images/icons/1.png'} style={stylePhoto} alt=""/></Col>
                                                    <Col xs="12" sm="10">
                                                        <Row>
                                                            <Col xs="12">
                                                                <Row>
                                                                    <Col xs="12" lg="6">
                                                                        <Row>
                                                                            <Col xs="5">Stanowisko:</Col><Col xs="7">{users.name}</Col>
                                                                            <Col xs="5">Firma:</Col><Col xs="7">-</Col>
                                                                            <Col xs="5">Dział:</Col><Col xs="7">-</Col>
                                                                            <Col xs="5">Oddział:</Col><Col xs="7">-</Col>
                                                                            <Col xs="5">Zespół:</Col><Col xs="7">-</Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col xs="12" lg="6">
                                                                        <Row>
                                                                            <Col xs="6">Telefon komórkowy:</Col><Col xs="6">{users.mobilePhoneNumber}</Col>
                                                                            <Col xs="6">Telefon wewnętrzny:</Col><Col xs="6">{users.internalPhoneNumber}</Col>
                                                                            <Col xs="6">E-mail:</Col><Col xs="6">-</Col>
                                                                            <Col xs="6">Telefon stacjonarny:</Col><Col xs="6">{users.phoneNumber} </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Card className="card-accent-secondary" />
                                                    </Col>
                                                </Row>
                                            </CardBlock>
                                        </Card>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Col>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state.users);
    return { users: state.users.users }
}

WorkersList.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(WorkersList);