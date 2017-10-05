import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Card, CardHeader, CardFooter, CardBlock, Label, Input} from "reactstrap";
import {Doughnut} from "react-chartjs-2";

const stylemain = {textAlign: 'center', fontFamily: 'Verdana, Arial,  sans-serif'};
const stylePercent = {
    position: 'absolute',
    left: '0',
    top: '42%',
    width: '100%',

};
const chartsOptions ={
    legend: false,
    tooltips: {
        enabled: false,
        intersect: false,
        mode: 'dataset',
        displayColors: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return data.datasets[0].data[0] + ' %';
            }
        }
    }
};



class AdvicerWork extends Component {

    componentWillMount(){
        this.props.getLoggedUserDetail();
    }

    render() {

        var transakcje2 = this.props.my_detail ? this.props.my_detail.transactions_this_month : 0;
        var transakcje_plan2 = this.props.my_detail ? this.props.my_detail.plan_na_ten_mc : 0;

        var transakcje = this.props.my_detail ? this.props.my_detail.transaction_last_month : 0;
        var transakcje_plan = this.props.my_detail ? this.props.my_detail.plan_na_poprzedni_mc : 0;

        var office2 = this.props.my_detail ? this.props.my_detail.office_work_this_month : 0;
        var office_plan2 = this.props.my_detail ? this.props.my_detail.office_plan_this_month : 0;

        var office = this.props.my_detail ? this.props.my_detail.office_work_last_month : 0;
        var office_plan = this.props.my_detail ? this.props.my_detail.office_plan_last_month : 0;

        var proc_last_month_transaction = this.props.my_detail ? this.props.my_detail.percent_last_month_transaction : 0;
        var proc_this_month_transaction = this.props.my_detail ? this.props.my_detail.percent_this_month_transaction : 0;
        var proc_last_month_office = this.props.my_detail ? this.props.my_detail.percent_last_month_office : 0;
        var proc_this_month_office = this.props.my_detail ? this.props.my_detail.percent_this_month_office : 0;
        var transaction_data_last_month = proc_last_month_transaction < 100 ? [transakcje, transakcje_plan] : [proc_this_month_transaction];
        var transaction_data_this_month = proc_this_month_transaction < 100 ? [transakcje2, transakcje_plan2] : [proc_this_month_transaction];
        var office_data_last_month = proc_last_month_office < 100 ? [office, office_plan] : [proc_last_month_office];
        var office_data_this_month = proc_this_month_office < 100 ? [office2, office_plan2] : [proc_this_month_office];
        var data1 = {
            labels: [
                'Zrobione',
                ''
            ],
            datasets: [{
                data: office_data_last_month,
                backgroundColor: [
                    '#4dbd74',
                    '#cccccc'
                ],
                hoverBackgroundColor: [
                    '#4dbd74',
                    '#cccccc'
                ]
            }]
        };

        var data2 = {
            labels: [
                'Zrobione',
                ''
            ],
            datasets: [{
                data: office_data_this_month,
                backgroundColor: [
                    '#4dbd74',
                    '#cccccc'
                ],
                hoverBackgroundColor: [
                    '#4dbd74',
                    '#cccccc'
                ]
            }]
        };

        var data3 = {
            labels: [
                'Zrobione',
                ''
            ],
            datasets: [{
                data: transaction_data_last_month,
                backgroundColor: [
                    '#20a8d8',
                    '#cccccc'
                ],
                hoverBackgroundColor: [
                    '#20a8d8',
                    '#cccccc'
                ]
            }]
        };

        var data4 = {
            labels: [
                'Zrobione',
                ''
            ],
            datasets: [{
                data: transaction_data_this_month,
                backgroundColor: [
                    '#20a8d8',
                    '#cccccc'
                ],
                hoverBackgroundColor: [
                    '#20a8d8',
                    '#cccccc'
                ]
            }]
        };

        return (
            <Row style={stylemain}>
                <Col xs="12" sm="6">
                    <Card className="card-accent-success">
                        <CardHeader> Praca Operacyjna </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12" sm="6">
                                    <Col xs="12" style={stylemain}>Poprzedni miesiąc</Col>
                                    <Col xs="12">
                                        <Col style={stylePercent} className="h4">{proc_last_month_office}%</Col>
                                        <Doughnut options={chartsOptions} data={data1}/>
                                    </Col>
                                    <Col xs="12" style={stylemain}>na 1000</Col>
                                </Col>
                                <Col xs="12" sm="6">
                                    <Col xs="12" style={stylemain}>Ten miesiąc</Col>
                                    <Col xs="12">
                                        <Col style={stylePercent} className="h4">{proc_this_month_office}%</Col>
                                        <Doughnut options={chartsOptions} data={data2}/>
                                    </Col>
                                    <Col xs="12" style={stylemain}>na 1000</Col>
                                </Col>
                            </Row>
                        </CardBlock>
                    </Card>
                </Col>

                <Col xs="12" sm="6">
                    <Card className="card-accent-primary">
                        <CardHeader> Obroty </CardHeader>
                        <CardBlock className="card-body">
                            <Row>
                                <Col xs="12" sm="6">
                                    <Col xs="12" style={stylemain}>Poprzedni miesiąc</Col>
                                    <Col xs="12">
                                        <Col style={stylePercent} className="h4">{proc_last_month_transaction}%</Col>
                                        <Doughnut options={chartsOptions} data={data3}/>
                                    </Col>
                                    <Col xs="12" style={stylemain}>na 1000</Col>
                                </Col>
                                <Col xs="12" sm="6">
                                    <Col xs="12" style={stylemain}>Ten miesiąc</Col>
                                    <Col xs="12">
                                        <Col style={stylePercent} className="h4">{proc_this_month_transaction}%</Col>
                                        <Doughnut options={chartsOptions} data={data4}/>
                                    </Col>
                                    <Col xs="12" style={stylemain}>na 1000</Col>
                                </Col>
                            </Row>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        );
    }
}
function mapStateToProps(state){
    return {
        my_detail: state.my_detail.my_detail
    }
}
AdvicerWork.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(AdvicerWork);