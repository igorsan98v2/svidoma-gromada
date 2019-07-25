import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper'
import ImageGallery from 'react-image-gallery';
import { makeStyles } from '@material-ui/core/styles';
import AwesomeSlider from 'react-awesome-slider';
import { Carousel } from 'react-responsive-carousel';
import 'react-awesome-slider/dist/styles.css';
import {CloseRounded as Close,FullscreenRounded as Fullscreen} from "@material-ui/icons"
import '../styles/event-popup.css'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ScrollableAnchor from 'react-scrollable-anchor'
import $ from 'jquery';
import AnchorLink from 'react-anchor-link-smooth-scroll'
 
class EventPopUp extends Component{
    constructor(props){
        super(props);
        this.state = {isOpen:true,isFullSize:false,modalState:"background",popUp:"popup",galleryWidh:"100%"};
        this.closePopUp = this.closePopUp.bind(this);
        this.makeFullSize = this.makeFullSize.bind(this);
        
    }
    closePopUp(){
        this.setState((state)=>{return {isOpen:!state.isOpen}} );
        this.state.modalState="background"+ (this.state.isOpen?"":" close");
        console.log(this.state);
    }
    makeFullSize(){
        this.setState((state)=>{
            
            return {isFullSize:!state.isFullSize}} );
        this.state.popUp="popup"+(this.state.isFullSize?" full":"");
        if(this.state.isFullSize){
            this.state.galleryWidh="65vw";
        }
        else  this.state.galleryWidh="100%";

    }
    componentDidUpdate(){
      
     
    }
    render(){

        const images = [
            {
              original: 'http://lorempixel.com/1000/600/nature/1/',
              thumbnail: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
              original: 'http://lorempixel.com/1000/600/nature/2/',
              thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
              original: 'http://lorempixel.com/1000/600/nature/3/',
              thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            }
        
        ]
        let eventTitle="Title for event";
        let date = "01/03/19";
        let event ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Id velit ut tortor pretium viverra suspendisse. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Vel turpis nunc eget lorem dolor sed. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Aliquet eget sit amet tellus cras adipiscing enim eu. Augue lacus viverra vitae congue eu consequat ac felis donec.";
        let content = images.map(image => (<div>
            <img alt="нема зображент :/" src={image.original} />
            </div>));
    

        const popup= <div className={this.state.modalState}>
            <Paper className={this.state.popUp}>
            <div className="control-tools">
                <Fullscreen   onClick={this.makeFullSize}  color="disabled"/>
                <Close onClick={this.closePopUp} color="disabled"/>
            </div>
            <div id ="head">
                <h2>
                    {eventTitle}
                </h2>
                <div className="date">
                    {date}
                </div>
            </div>
            <div className="modal-body">
                <div id="image-gallery" > <Carousel 
                showThumbs={false}
                infiniteLoop={false}
                width={this.state.galleryWidh}>{content}</Carousel></div>
               
                
                <div id="text-part"> {event}</div>
                
                  
           
            </div>
           
        </Paper>
        </div>
        return popup;
    }
}
export default EventPopUp;