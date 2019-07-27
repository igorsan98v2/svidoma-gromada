import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import LocationOn from  '@material-ui/icons/LocationOn';
import {unByKey} from 'ol/Observable.js';
import {easeOut} from 'ol/easing.js';
import Draw from 'ol/interaction/Draw.js';
import Overlay from 'ol/Overlay.js';
import './styles/map.css'
import {toStringHDMS} from 'ol/coordinate.js';
import Button from '@material-ui/core/Button';
const Proj =require('ol/proj');



class PublicMap extends Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
    this.popUpContent = React.createRef();
    this.closePopUp = this.closePopUp.bind(this);
    this.allowAddMarker = this.allowAddMarker.bind(this);
    this.allowButton = React.createRef();
    this.decilineButton =  React.createRef();
    //need last user view
    this.state = { center: [2989282.908734901,  6254723.516520006], zoom: 13,isAviable:false};

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      }),
     
    });
   
    this.featuresList = [];
    var source = new VectorSource({wrapX: false});
    var places = [26.85318525473822,48.88117642227235];
    var marker = new Feature({
      geometry: new Point(Proj.transform([places[0],places[1]],'EPSG:4326', 'EPSG:3857'))
    });
    
    let style = new Style({
      image:
      new Icon({  
        size:[32,32],  
        crossOrigin: 'anonymous',                                                                                 
        src:'http://maps.google.com/mapfiles/ms/micons/red.png',
                                                                                                                                                                                     
        
      })
    });
    marker.setStyle(style);
    this.featuresList.push(marker);
    //marker.setId(555);
    
    var vectorSource= new VectorSource({features:[marker]});
    var map = this.olmap;
    vectorSource.on('addfeature', function(e) {
      //this.updateMarkers(e.feature);
        ((feature)=>{
          console.log(feature);
          map.render();
        })(e.feature);
    });
    this.vectorSource=vectorSource;
    var layerVector = new LayerVector({
      source:vectorSource});
    
    this.layerVector = layerVector;
    this.olmap.addLayer(layerVector);
    this.isTimeToAdd= false;
    this.olmap.on('click',(event)=>{
      this.coordinate = event.coordinate;
      //this.addMarker(event.coordinate);
    });
    var that = this;
      map.on('postcompose', function(event){
        if(false==true){
        console.log("postcompose is runned");
        var context = event.vectorContext;
        let size = that.featuresList.length;
        let style = new Style({
          image:
          new Icon({  
            size:[32,32],  
            crossOrigin: 'anonymous',                                                                                 
            src:'http://maps.google.com/mapfiles/ms/micons/red.png',                                                                                                                                                                                   
          })
        });
        that.featuresList.forEach(feature => {
      //    context.setStyle(style);
          context.drawFeature(feature,style);
        });
       
        map.render();
        console.log(that.featuresList);
        that.isTimeToAdd=false;
      }
    });
   
      
    
  }
  
  addMarker(coord){
    console.log(coord);
    
    let  marker = new Feature({
      geometry: new Point(coord)
     
    });
    let style = new Style({
      image:
      new Icon({  
        size:[32,32],  
        crossOrigin: 'anonymous',                                                                                 
        src:'http://maps.google.com/mapfiles/ms/micons/red.png',                                                                                                                                                                                   
      })
    });
    marker.setStyle(style);
    this.featuresList.push(marker);
    this.isTimeToAdd= true;
    this.vectorSource.addFeature(marker);
    
   // marker.setStyle(style);
    //marker.setId(666);
    
  //  this.vectorSource.addFeatures([marker]);
    //this.olmap.render();
}
  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
    
  }
  closePopUp(){
    this.overlay.setPosition(undefined);
    this.closer.blur();
    return false;
  }
  allowAddMarker(event){
     console.log("try to change state");
     this.setState(prvState => {
        console.log("is Marker set allowed ?"+(!prvState.isAviable));
        return {isAviable:!prvState.isAviable}
     })  ;
     this.addMarker(this.coordinate);
     this.closePopUp();
  }
  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
    var container = this.popup.current;
    console.log(container);
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }});
    this.overlay = overlay;
    var content = this.popUpContent.current;
    let allow = this.allowButton.current;
    allow.onclick = this.allowAddMarker;
    let closer= this.decilineButton.current;
    this.closer = closer;
    console.log(content);
    this.olmap.addOverlay(overlay);
    
    var that = this;
    this.olmap.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      var hdms =toStringHDMS(Proj.toLonLat(coordinate));
      console.log(that.content);
      content.innerHTML = '<p>Бажаєте обозначити подію тут ?</p><code>' + hdms +
          '</code>';
      overlay.setPosition(coordinate);
    });
    closer.onclick = this.closePopUp;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
   // this.getData();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }
  getData(){
    let arrCoord = this.olmap.getView().getCenter();
    console.log({center:{x:arrCoord[0],y:arrCoord[1]},
      zoom:this.olmap.getView().getZoom()});
    console.log(Proj.toLonLat(arrCoord))
  }
  render() {
    this.updateMap(); // Update map on render?
    //   <button onClick={e => this.userAction()}>setState on click</button>
    return (<div>
      <div id="map" style={{ width: "100%", height: "80vh" }}>
          
      </div>
       <div id="popup" className="ol-popup" ref={this.popup}>
        <div id="popup-content" ref={this.popUpContent}></div>
        <div className="buttons-container">
          <Button ref={this.allowButton}  color="primary">
            Так
          </Button>
          <Button  ref={this.decilineButton}  color="primary">
            Ні
          </Button>
        </div>
        </div>
        
      </div>
    );
  }
}

export default PublicMap;
