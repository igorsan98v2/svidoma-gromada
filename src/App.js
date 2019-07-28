import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link,Redirect } from "react-router-dom";


import MyMap from "./map";
import './styles/sigin.css';
import NavBar from "./header";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SigIn from './components/sign-in/SignIn'
import EventList from './components/EventList';
import Button from '@material-ui/core/Button';
import './index.css'
import EventPopUp from './components/EventPopUp';
import Checkout from './components/checkout/Checkout';
class App extends Component {
  constructor(props){
    super(props);

  //  this.props =props.props;
    console.log(this.props)
    this.state = {
      /*page 0 */
      pageToLoad: this.props.propsList.pageList.map,
      auth:false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  findID(element){
    let id=-1;
   
    if( element.attributes.hasOwnProperty('menuid')){
     
      let menuItems = this.props.propsList.menuItems;
      let menuid  = element.attributes.menuid.value;
      for(let i in menuItems){
                
         if(Number(menuid)===menuItems[i].id){
           
           return menuItems[i].id;
         
          }
      }
    }
    return id; 
  } 
  handleClick(e) {
    console.log("try to handle click");
    console.log(e.target);
    let id = this.findID(e.target);
    if(id>-1&&id<this.props.propsList.menuItems.length-1){
      this.setState({
        pageToLoad:id
      });
    }
    else if(id == this.props.propsList.menuItems.length-1){
      this.setState({
        auth:!this.state.auth
      });
    }
  }
  //unusage?
  loadAnotherPage(){
    let id = this.state.pageToLoad;
    let pageList = this.props.propsList.pageList;
    switch (id) {
      case pageList.map:
        
        break;
    
      case pageList.newsList:break;
      case pageList.searchRes:break;
      case pageList.log: 
    }
  }
  componentDidUpdate(prevProps,prevState){
    
    if(this.state.pageToLoad!=prevState.pageToLoad){   
       this.loadAnotherPage()                                                                                                                                                                                                                                                                                      
   
    }
  }             
  render(){
    let menuItems = [
      {title:'мапа'},
      {title:'стрічка новин'},
      {title:'о громаді'}

    ];
   let toRender=null;
   let id = this.state.pageToLoad;
   let pageList = this.props.propsList.pageList;
   
    const dynamicElement = ()=>{
          switch (id) {
            case pageList.map:
          //     return (<MyMap/>);
            break
            case pageList.newsList:
                
            //  return (<EventList/>)
            case pageList.searchRes:break;
           
          }
    }
    const logScreen = ()=>{
        return ((this.state.auth)?
        <div onClick={this.handleClick} menuid={this.props.propsList.pageList.login} className="backgroud">
          <div id="sigin-popup">
            <SigIn />
          </div>
        </div>:"");
        
    }
   toRender = (
   <div className="App">
      <Router>
        <MuiThemeProvider>
          <NavBar titleName={"Свідома громада"} 
          menuItems = {this.props.propsList.menuItems} 
          onClick={this.handleClick} />
       </MuiThemeProvider>
     

        <Route path='/map' component={MyMap}/>
        <Route path='/event-list' component={EventList}/>
        <Route path='/community' component={Checkout}/>
        <Route exact path="/" render={() => (
        <Redirect to="/map"/>
        )}/>     

      </Router>
      
      {logScreen()}
      <EventPopUp></EventPopUp>
      <footer>    footer after all</footer>
    </div>);
   
    return toRender;
  }
}

export default App;
