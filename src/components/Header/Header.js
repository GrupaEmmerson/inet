import React, {Component} from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';
import Logo from '../../../public/img/logo.svg';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
    componentWillMount() {
        this.props.getLoggedUserDetail();
    }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {

    return (
      <header className="app-header navbar navbar-dark" style={{backgroundColor: '#D82624', color: '#fff'}}>
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <nav>
          <a href="#">
            <img src={Logo} style={{ width: 200 + 'px', height: 54 + 'px'}}/>
          </a>
        </nav>
        <NavbarToggler className="d-md-down-none" style={{color: '#fff'}} onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink style={{color: '#fff'}} href="https://program.emmerson.pl/index.aspx" target="_blank"><img style={{width:  25 + '%'}} src="img/icon_gal.png"/> Galactica</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink style={{color: '#fff'}} href="http://poczta.emmerson.pl/" target="_blank"><img style={{width:  35 + '%'}} src="img/poczta.png"/> Poczta</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar >
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle" style={{color: '#fff'}}>
                <span className="d-md-down-none">{!this.props.my_detail ? '' : this.props.my_detail.name}</span>
                <img src={!this.props.my_detail ? 'https://inet.emmerson.pl/images/icons/1.png' : this.props.my_detail.photoUrl ? 'https://inet.emmerson.pl/'+this.props.my_detail.photoUrl :  'https://inet.emmerson.pl/images/icons/1.png'} className="img-avatar" alt=""/>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
                <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
                <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                <DropdownItem divider/>
                <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                <DropdownItem href="#/logout"><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        <NavbarToggler style={{color: '#fff'}} className="d-md-down-none" type="button" onClick={this.asideToggle}>&#9776;</NavbarToggler>
      </header>
    )
  }
}
function mapStateToProps(state){
    console.log(state.my_detail);
    return { my_detail: state.my_detail.my_detail }
}

Header.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(Header);
