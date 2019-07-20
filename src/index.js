import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const propsList = { 
    pageList:{
      map:0,
      newsList:1,
      searchRes:2,
      login:3
    }
   
};
let menuItems =[
    {title:'мапа',path:'/map'},
    {title:'стрічка новин',path:'/event-list'},
    {title:'о громаді',path:'/community'},
    {title:'',path:''}];
propsList.menuItems=[];

for(let e in propsList.pageList ){
    let i = propsList.pageList[e];
    if(i>=0 && i<menuItems.length)
    propsList.menuItems.push({title:menuItems[i].title,id:i,path:menuItems[i].path});
}
ReactDOM.render(<App propsList={propsList} />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
