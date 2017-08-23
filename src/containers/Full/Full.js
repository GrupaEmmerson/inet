import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import MainPage from '../../views/MainPage/';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';

import RequireAuth from '../../components/auth/require_auth';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/mainpage" name="MainPage" component={RequireAuth(MainPage)}/>
                <Route path="/dashboard" name="Dashboard" component={RequireAuth(Dashboard)}/>
                <Route path="/components/buttons" name="Buttons" component={RequireAuth(Buttons)}/>
                <Route path="/components/cards" name="Cards" component={RequireAuth(Cards)}/>
                <Route path="/components/forms" name="Forms" component={RequireAuth(Forms)}/>
                <Route path="/components/modals" name="Modals" component={RequireAuth(Modals)}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={RequireAuth(SocialButtons)}/>
                <Route path="/components/switches" name="Swithces" component={RequireAuth(Switches)}/>
                <Route path="/components/tables" name="Tables" component={RequireAuth(Tables)}/>
                <Route path="/components/tabs" name="Tabs" component={RequireAuth(Tabs)}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={RequireAuth(FontAwesome)}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={RequireAuth(SimpleLineIcons)}/>
                <Route path="/widgets" name="Widgets" component={RequireAuth(Widgets)}/>
                <Route path="/charts" name="Charts" component={RequireAuth(Charts)}/>
                <Redirect from="/" to="/login"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
