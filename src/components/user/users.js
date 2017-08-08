import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Users extends Component{

    componentWillMount(){
        this.props.getUsers();
    }

    showUsers(user){

        return(
            <div>{user.username}</div>
        );

    }

    render(){

        if(!this.props.users){
            return <div>Loading Users...</div>
        }


        return(
            <div>
                <p>This is the component for the user profile.</p>
                { this.props.users.map(this.showUsers) }
            </div>
        );
    }
}

function mapStateToProps(state){
    return { users: state.users.users }
}

export default connect(mapStateToProps, actions)(Users);