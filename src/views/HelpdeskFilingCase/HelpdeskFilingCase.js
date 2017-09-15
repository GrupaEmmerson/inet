import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchInput, {createFilter} from 'react-search-input'
let testWeakMap = new WeakMap();


const KEYS_TO_FILTERS = ['categoryId'];

class HelpdeskFilingCase extends Component {

    componentWillMount(){
        this.props.getHelpdeskCaseAndCategory();

    }

    constructor () {
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
    categoryList(e){
        return(
            <a href="#" onClick={this.searchTerm.bind(e.id)} > {e.name} </a>
        );
    }
    render() {

        if(!this.props.helpdesk_cases){
            return <div>Loading...</div>
        }

        const filteredEmails = this.props.helpdesk_cases.cases.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        return (
            <div>

                { this.props.helpdesk_cases ? this.props.helpdesk_cases.category.map(this.categoryList) : '' }

                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>temat</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredEmails.map(e => {
                        return (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.text}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { helpdesk_cases: state.helpdesk_cases.helpdesk_cases }
}

HelpdeskFilingCase.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};
export default connect(mapStateToProps, actions)(HelpdeskFilingCase);