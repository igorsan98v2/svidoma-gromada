import React,{Component}from 'react'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from '@material-ui/core';
import "../styles/profile.css";
import {  Link } from "react-router-dom";

class UserInfo extends Component {
    render(){
        let userAcronym = "IY";
        let img ="";
        let username = "Igor Yutsyk"
        let location = "Краматорськ" ;
        let status ="зісновник"
        let reputation = "карма рівень біг"
        return (
            <Paper id="profile-info">
                <Avatar className="avatar">{userAcronym}</Avatar>
                <div className="profile-text">
                    <div className="username">{username}</div>
                    <div className="user-describe">
                        <div>ОТГ: {location}</div>
                        <div>статус учасника: {status}</div>
                        <div>довіра до учасника: {reputation}</div>
                    </div>   
                    <div className="edit">
                        <Link className="link">edit</Link>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default UserInfo;