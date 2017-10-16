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
import OfficeWorkCreate from '../../views/OfficeWorkCreate/';
import WorkersList from '../../views/WorkersList/';
import Helpdesk from '../../views/HelpdeskFilingCase/';
import News from '../../views/News'

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
                <Route path="/office_work_detail" name="Praca Operacyjna Lista" component={RequireAuth(OfficeWork)}/>
                <Route path="/office_work_create" name="Praca Operacyjna Wprowadzanie" component={RequireAuth(OfficeWorkCreate)}/>
                <Route path="/workers_list" name="Lista Pracowników" component={RequireAuth(WorkersList)}/>
                <Route path="/helpdesk" name="Lista Pracowników" component={RequireAuth(Helpdesk)}/>
                <Route path="/news" name="Nowości" component={RequireAuth(News)}/>
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
