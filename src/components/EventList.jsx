import React,{ Component } from "react";
import "../styles/event-list.css";
import {FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import $ from 'jquery'; 
import NoPhoto from "../photo.png"
class EventList extends Component{
    
    render(){
                    
        const Row = ({ index, style }) => (
            <div className="list-item" style={style}>
               <h3>Row {index}</h3>
               <img  src={NoPhoto}></img>
               <div>
                   <span>tag 1</span>
                   <span>tag 2</span>
                   <span>tag 3</span>
                    
                   <div className ="describe">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis lectus nulla at. Felis eget velit aliquet sagittis id. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Ipsum dolor sit amet consectetur adipiscing elit.
                   </div>
                </div>
            </div>
          );
          
          const list = () => (
            <AutoSizer >{({height,width})=>(
                <List
                className="List"
               height={$(window).height()*0.8}
               // height ={height}
                itemCount={100}
                itemSize={$(window).height()*1.2}
            
                width={$(window).width()}>
             
                    {Row}
                </List>)
            }
            </AutoSizer>
        );
       
        return (list());
    }
}
export default EventList;