import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server'
import axios from 'axios'
import Popup from './Popup.jsx'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const style1 = {
    flexGrow: 1,
    color: 'red',
  }

 class Map extends Component {
   constructor(props) {
     super()
     this.state = {
       on: props.activities
     }
   }

   async componentDidMount() {
     // THIS IS THE LOGIC
     // this.props.user.activites.map((activity) => {
     //   if (!this.state.on.includes(activity)) {
     //     this.toggleVisibility(activity)
     //   }
     // })
      mapboxgl.accessToken = `pk.eyJ1IjoiYWdhbGFuaXM3IiwiYSI6ImNqbmFvOXE1YTIxeDAzcGxkdmxrbXRuYTUifQ.GAvil-V1zDFmEI2QMAIW3Q`
      //OPTIONS FOR BUILT IN GEOLOCATOR BUTTON
      const geolocationOptions = {
      //Tells Geocoder to use gps locating over ip locating
        enableHighAccuracy: true,
      //Sets maximum wait time
        maximumAge        : 30000,
        timeout           : 27000
      };

      //OPTIONS FOR MAPBOX COMPONENT
      const mapOptions = {
        //DEFINES CONTAINER
        container: this.mapContainer,
        style: `mapbox://styles/agalanis7/cjonn3677227c2so4jcn3t5um`,
        zoom: 12,
        center: [-80.2044, 25.8028]
      }

      this.createMap(mapOptions, geolocationOptions)
   }

   createMap = (mapOptions, geolocationOptions) => {
     this.map = new mapboxgl.Map(mapOptions)
     const map = this.map;

     map.addControl(
       new mapboxgl.GeolocateControl({
         positionOptions: geolocationOptions,
         trackUserLocation: true
       })
     )
     map.addControl(
       new mapboxgl.NavigationControl({
         positionOption: geolocationOptions,
         trackUserLocation: true
       })
     )

     map.on('load', (event) => {

      const icons = {
        basketball: "basketball",
        tennis: "tennis",
        baseball: "baseball",
        golf: "golf",
        biking: "bicycle-15",
        volleyball: "volleyball"
      }

      map.addSource(
        'events', {
                    type: 'geojson',
                    data: '/events.json'
                  }
      )
      this.props.events.forEach((event) => {
        var eventType = event.properties.event_type
        console.log(event);
        if(!map.getLayer(eventType)){
          map.addLayer({
            id: eventType,
            type: "symbol",
            source: "events",
            layout: {
              "icon-image": icons[eventType],
              "icon-allow-overlap": true
            },
            filter: ["==", "event_type", eventType]
          })
          map.on('click', eventType, (e) => {
            var coordinates = e.features[0].geometry.coordinates.slice()
            var title = e.features[0].properties.title
            var location = e.features[0].properties.location
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
            }
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<a href=${location}>${title}</a>`)
                .addTo(map)
          })
          map.on('mouseenter', eventType, () => {
            map.getCanvas().style.cursor = 'pointer'
          })
          map.on('mouseleave', eventType, () => {
            map.getCanvas().style.cursor = ''
          })
        }
      })
    })
  }

   componentDidUpdate() {
     console.log(this.props.events)
   }

   componentWillUnmount() {
     this.map.remove();
  }

  toggleVisibility = (eventType) => {
    this.map.setLayoutProperty(eventType, 'visibility',
      this.state.on.includes(eventType) ? "none" : "visible"
    );
    let { on } = this.state
    if(on.includes(eventType)){
      on = on.filter(eType => eType !== eventType)
    }else{
      on.push(eventType)
    }
    this.setState({ on })
  }

   render() {
     const { classes } = this.props;
     const style = {
       width: '100%',
       height: '30em',
       backgroundColor: 'azure',
       borderRadius: '5%'
     };
     return (
       <div>
          <div style={style1}>
             <div style={{textAlign:'center', direction:'column', padding:'10px' }}  >
              <Button onClick={ () => { this.toggleVisibility("basketball") } } variant={ this.state.on.includes("basketball") ? "contained" : "outlined" } style={{marginBottom:'10px', marginRight:'11px'}}>Basketball</Button>
              <Button onClick={ () => { this.toggleVisibility("biking") } } variant={ this.state.on.includes("biking") ? "contained" : "outlined" } style={{marginBottom:'10px'}}>Biking </Button>
              <Button onClick={ () => { this.toggleVisibility("baseball") } } variant={ this.state.on.includes("baseball") ? "contained" : "outlined" } style={{marginBottom:'10px', marginRight:'5px'}}>Baseball</Button>
              <Button onClick={ () => { this.toggleVisibility("tennis") } } variant={ this.state.on.includes("tennis") ? "contained" : "outlined" } style={{marginBottom:'10px', marginRight:'5px'}}>Tennis </Button>
              <Button onClick={ () => { this.toggleVisibility("golf") } } variant={ this.state.on.includes("golf") ? "contained" : "outlined" } style={{marginBottom:'10px'}}>Golf </Button>
              <Button onClick={ () => { this.toggleVisibility("volleyball") } } variant={ this.state.on.includes("volleyball") ? "contained" : "outlined" } style={{marginBottom:'10px'}}>Volleyball </Button>
             </div>
          </div>

          <div id="map" style={style} ref={el => this.mapContainer = el} />
       </div>
     )
   }
 }





export default Map
