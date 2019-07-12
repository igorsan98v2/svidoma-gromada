import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';


class PublicMap extends Component {
  constructor(props) {
    super(props);
    //need last user view
    this.state = { center: [2989282.908734901,  6254723.516520006], zoom: 13 };

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
      })
    });
    var source = new VectorSource({wrapX: false});
   
// vector is a layer of type Vector, not a source !
   /* var vector = new LayerVector({
    source: source
    });
    this.olmap.addLayer(vector);*/

  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
    
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    //this.getData();
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
  }
  render() {
    this.updateMap(); // Update map on render?
    //   <button onClick={e => this.userAction()}>setState on click</button>
    return (
      <div id="map" style={{ width: "100%", height: "80vh" }}>
          
      </div>
    );
  }
}

export default PublicMap;
