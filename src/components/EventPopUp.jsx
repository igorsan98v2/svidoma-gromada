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

class EventPopUp extends Component{
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
        const popup= <div className="background"><Paper id="popup">
            <div className="control-tools">
                <Fullscreen color="disabled"/>
                <Close color="disabled"/>
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
                <Carousel id="image-gallery" 
                showThumbs={false}
                infiniteLoop={false}>{content}</Carousel>
                <a href='#section1'> Go to section 1 </a>
                <ScrollableAnchor id={'section1'}>
                    <div id="text-part"> {event}</div>
                </ScrollableAnchor>>
            </div>
           
        </Paper>
        </div>
        return popup;
    }
}
export default EventPopUp;