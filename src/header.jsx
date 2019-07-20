import React ,{Component} from 'react';
import './styles/header.css'
import 'material-ui';
import SearchBar from 'material-ui-search-bar'
import PersonOutlinedIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/icons/Menu';

import MyMap from "./map";

import EventList from './components/EventList';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends Component{
    elChoose(e){
        console.log(e.target);
        
    }
    render(){
        let title = this.props.titleName;
        let menuItems =  this.props.menuItems.map((menuItem,index)=>{
            return(<li key={index}  menuid={menuItem.id} 
            onClick={this.props.onClick}>{<Link to={menuItem.path} >{menuItem.title}</Link>}</li>);
            //return(<li key={index} onClick={this.elChoose} menuid={menuItem.id} >{menuItem.title}</li>);
        });
        let menuSize = menuItems.length;
        let loginButton =  menuItems[menuSize-1];
        console.log(loginButton);
        menuItems[menuSize-1] = (<li id="login-button"  key={loginButton.key}
            menuid = {loginButton.props.menuid}
            onClick = {this.props.onClick}>
            
            <div menuid = {loginButton.props.menuid}  onClick = {this.props.onClick}>
                {"Увійти"}
            </div>
            <PersonOutlinedIcon id="login-logo"></PersonOutlinedIcon>  
            
        </li>  )
        console.log(menuItems);
        //&#x2630;
        const header = (
            <div id="header">
                <div id="hm-menu">
                    <div id="hm-icon">
                       <div>&#x2630;</div>
                    </div>
                    <ul id='menu-item-list'>
                        
                        {menuItems}
                      
                      
                       
                    </ul>
                </div>
                <div className="title-container">
                    <h2 className='title-name'>{title}</h2>
                  
                </div>
                <div className="search-container">
                    <SearchBar 
                         onChange={(value) => console.log('onChangeSearch')}
                         onRequestSearch={() => console.log('onRequestSearch')}
                    />

                   
                </div>
            </div>
            );

        return header;
    }
}
export default NavBar;