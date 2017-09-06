import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import MainPage from '../../views/MainPage/';
import OfficeWork from '../../views/OfficeWork/';
import WorkersList from '../../views/WorkersList/';

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
                <Route path="/office_work" name="Praca Operacyjna" component={RequireAuth(OfficeWork)}/>
                <Route path="/workers_list" name="Lista Pracowników" component={RequireAuth(WorkersList)}/>
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
