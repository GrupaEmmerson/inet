import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import Widget02 from './Widget';
import AdvicerWork from './AdvicerWork';

 import TopEmmerson from './TopEmmerson';

const styleMain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};

class MainPage extends Component{

    componentDidMount(){
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
        if(!this.props.news_latest){
            return(
                <div>Loading...</div>
            );
        }
        return (
                <div >
                    <AdvicerWork />
                    <Col xs="12" style={styleMain} className="h1">
                        <b>Top Emmerson</b>
                    </Col>
                    <TopEmmerson user_card={ this.props.user_card } />
                    <Col xs="12" className="h2" style={styleMain}>
                        <b>Nowości</b>
                    </Col>
                    <Row>
                        { this.props.news_latest.map(this.getNews) }
                    </Row>
                </div>
            )
    }
}

function mapStateToProps(state){
    return {
        news_latest: state.news_latest.news_latest,
        my_detail: state.my_detail.my_detail,
        user_card: state.user_card.user_card,
    }
}
MainPage.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(MainPage);