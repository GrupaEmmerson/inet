import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import {newsId} from '../../Config/';
import SearchInput, {createFilter} from 'react-search-input';

let testWeakMap = new WeakMap();
const KEYS = ['id'];
const styleMain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};
const styleTxt = {textAlign: "justify", fontSize: 'large'};

class News extends Component{

    componentWillMount(){
        this.props.getNewsLatest();
        this.props.getLoggedUserDetail();
   }

    constructor () {
        super();
        this.state = {newsId: ''}
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    myNews(e){
        this.setState({newsId: e.toString()})
    }

    render(){
        if(!this.props.news_latest){
            return(
                <div>
                    Loading
                </div>
            )
        }

        if(window.MyNewsId){
            this.myNews(window.MyNewsId);
        }

        const news = this.props.news_latest.news.filter(createFilter(this.state.newsId, KEYS));

        if(!this.state.newsId){
            return(
                <div>
                    Loading
                </div>
            )
        }
        return (
            <div >
                <Col xs="12" className="h2" style={styleMain}>
                    <b>{news[0].title}</b><br/><br/>
                    <Col style={styleTxt}>
                        <td dangerouslySetInnerHTML={{__html: news[0].text}} />
                    </Col>
                </Col>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        news_latest: state.news_latest.news_latest,
        my_detail: state.my_detail.my_detail,
    }
}
News.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(News);