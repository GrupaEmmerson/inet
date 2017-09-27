import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col} from "reactstrap";
import Widget from './Widget';
import AdvicerWork from './AdvicerWork';
import TopEmmerson from './TopEmmerson';

const styleMain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};


class MainPage extends Component{

    componentWillMount(){
        this.props.getUserCard();
        this.props.getNewsLatest();
        this.props.getLoggedUserDetail();
    }

    passId(id){
        window.MyNewsId = id;
    };

    getNews(news){
        const regex = /(<([^>]+)>)/ig;
        return(
            <Col xs="12" sm="12" md="6">
                <Widget header={news.title}
                        value={news.id}
                        id={news.id}
                        mainText={news.text.replace(regex,"")
                            .replace(/&oacute;/ig,"ó")
                            .replace(/&ndash;/ig,"-")
                            .replace(/&nbsp;/ig,"")
                            .substring(0, 300) + "..."}
                        icon="fa fa-cogs"
                        color="primary"
                        footer link="#/news"
                        onClick={() => this.passId(news.id)}
                />
            </Col>
        )
    }

    renderTopEmmerson(e){
        return(
            <div>
                { e === 24 ? <TopEmmerson user_card={ this.props.user_card } /> : <div>Loading...</div>}
            </div>
        );
    }

    render(){
        if(!this.props.news_latest){
            return(
                <div>Loading...</div>
            );
        }
        console.log(this.props.user_card);
        return (
                <div >
                    <AdvicerWork />
                    <Col xs="12" style={styleMain} className="h1">
                        <b>Top Emmerson</b>
                    </Col>
                    { this.renderTopEmmerson(this.props.user_card ? this.props.user_card.length : 23)}
                    <Col xs="12" className="h2" style={styleMain}>
                        <b>Nowości</b>
                    </Col>
                    <Row>
                        { this.props.news_latest.news.map(this.getNews.bind(this)) }
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
    },
    news: function () {
        return React.PropTypes.array.isRequired;
    }
};

export default connect(mapStateToProps, actions)(MainPage);