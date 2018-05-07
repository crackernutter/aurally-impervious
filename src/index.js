//import L from 'leaflet';
import { map, geoJSON, layerGroup } from 'leaflet';
import { basemapLayer } from 'esri-leaflet';
import impervious from './assets/impervious5acre';
import area4 from './assets/area4';
import { area4Style, hexStyle} from './assets/styles';
import { center, zoom, basemap, controlsPosition, searchProviders } from './assets/config';
import {getLegend, getSearchControl, getLayerControl, getZoomHome} from './assets/controls';
import * as zoomhome from 'leafletzoom';

import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import '../node_modules/leafletzoom/dist/leaflet.zoomhome.css';
import './main.css';
const app = {};
L.LayerGroup.prototype.getLayer = function (id) {
  const layers = this._layers;
  let layer;
  for (let key in layers) {
    if (layers[key].options.id == id)
      layer = layers[key];
  }
  return layer;
}
init();

function init() {
  const ourMap = map('map', { zoomControl: false });
  ourMap.on('load', () =>{
    const layers = addLayers(ourMap);
    app.myLayerGroup = layerGroup(layers);
    addControls(ourMap);
  });
  ourMap.setView(center, zoom);
}
// add basemap
//L.Icon.Default.imagePath = '/images/';
//const myicon = icon({ iconUrl: 'images/marker-icon.png' });

function addLayers(ourMap) {
  basemapLayer(basemap).addTo(ourMap);
  const area4Layer = geoJSON(area4.area4, { id: 'area4', style: area4Style }).addTo(ourMap);
  const imperviousLayer = geoJSON(impervious.impervious, { id: "imperviousLayer", style: hexStyle }).addTo(ourMap);
  imperviousLayer.on('mouseout', e => {
    imperviousLayer.resetStyle(e.layer)
  });
  return [area4Layer, imperviousLayer];
}

function addControls(mapobj) {
  getLegend().addTo(mapobj);
  getZoomHome().addTo(mapobj);
  getLayerControl(app.myLayerGroup).addTo(mapobj);
  getSearchControl().addTo(mapobj);
  document.addEventListener('mousemove', lazyLoadAural);
}

function lazyLoadAural(){
  document.removeEventListener('mousemove', lazyLoadAural);
  return import (/* webpackChunkName: "aural" */ './assets/aural').then(module =>{
      const onPress = module.default;
      let myLayer = app.myLayerGroup.getLayer('imperviousLayer');
      myLayer.on('mouseover', onPress);
    });
}