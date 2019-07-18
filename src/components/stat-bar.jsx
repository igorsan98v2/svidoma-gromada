import React,{Component}from 'react'
import { Paper } from '@material-ui/core';
import "../styles/profile.css";
const {Donut,Legend} = require('britecharts-react');
class StatBar extends Component {

    constructor(props) {
      super(props);

      this.state = {highlightedSlice: null};
    }

    _handleMouseOver(data) {
        this.setState({
          highlightedSlice: data.data.id
        });
       
      }
  
      _handleMouseOut() {
        this.setState({
          highlightedSlice: 99999
        });
      }
  
   render(){
    const donutDataWith4Slices = [
        {
            quantity: 60,
            percentage: 60,
            name: 'обробляються',
            id: 1,
        },
        {
            quantity: 20,
            percentage: 20,
            name: 'відхилені',
            id: 2,
        },
        {
            quantity: 10,
            percentage: 10,
            name: 'виконуютсься',
            id: 3,
        },
        {
            quantity: 10,
            percentage: 10,
            name: 'виконані',
            id: 4,
        },
    ];
    const legendMargin = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 30,
      };

       return(
       <Paper className="stat">
                <Donut 
                data={donutDataWith4Slices}
                width={150}
                height={150}
                externalRadius={200 / 2.5}
                internalRadius={200 / 5}
                isAnimated={false}
                highlightSliceById={this.state.highlightedSlice}
                customMouseOver={this._handleMouseOver.bind(this)}
                customMouseOut={this._handleMouseOut.bind(this)}/> 
                <div>
                    <h3>Статсус заявок</h3>
                    <Legend 
                        data={donutDataWith4Slices}
                        height={200}
                        width={350}
                        margin = {legendMargin}
                        highlightEntryById={this.state.highlightedSlice}/>
                </div>
       </Paper>);
   }
}

export default StatBar;