import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import classnames from "classnames";
import Widget02 from './Widget';
import AdvicerWork from './AdvicerWork';
import TopEmmerson from './TopEmmerson';

const stylemain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};

class MainPage extends Component{

    componentWillMount(){
        this.props.getNewsLatest();
        this.props.getLoggedUserDetail();
        this.props.getUserCard();
    }

    getNews(news){
        const regex = /(<([^>]+)>)/ig;
        return(
            <Col xs="12" sm="12" md="6">
                <Widget02 header={news.title} mainText={news.text.replace(regex,"").replace(/&oacute;/ig,"ó").replace(/&ndash;/ig,"-").replace(/&nbsp;/ig,"").substring(0, 300) + "..."} icon="fa fa-cogs" color="primary" footer link="#/mainpage"/>
            </Col>
        )
    }

    render(){
        // console.log(this.props.top_emmerson_month_offer);
        // console.log(this.props.user_card);
        return (
                <div >
                    <AdvicerWork />
                    <Col xs="12" style={stylemain} className="h1">
                        <b>Top Emmerson</b>
                    </Col>
                    <TopEmmerson />
                    <Col xs="12" className="h2" style={stylemain}>
                        <b>Nowości</b>
                    </Col>
                    <Row>
                        { this.props.news_latest ? this.props.news_latest.map(this.getNews) : ''}
                    </Row>
                </div>
            )
    }
}

function mapStateToProps(state){
    return {
        news_latest: state.news_latest.news_latest,
        user_card: state.user_card.user_card,
        my_detail: state.my_detail.my_detail,
    }
}
MainPage.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(MainPage);