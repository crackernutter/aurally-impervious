import {control, DomUtil} from 'leaflet';
import { area4Style, hexStyle, getColor } from './styles';
import { controlsPosition, searchProviders } from './config';
import { basemapLayer } from 'esri-leaflet';
import { arcgisOnlineProvider, geosearch, FeatureLayerProvider } from 'esri-leaflet-geocoder';

function getZoomHome() {
    var zoomHome = L.Control.zoomHome({
      position: controlsPosition
    });
    return zoomHome;
  }
  
  function getLayerControl(myLayerGroup) {
    const Streets = basemapLayer('Streets');
    const Topo = basemapLayer("Topographic");
    const Oceans = basemapLayer("Oceans");
    const NatGeo = basemapLayer("NationalGeographic");
    const Gray = basemapLayer("Gray");
    const DarkGray = basemapLayer("DarkGray");
    const Imagery = basemapLayer('Imagery');
  
    const baseMaps = {
      "Streets": Streets,
      "Topo": Topo,
      "Oceans": Oceans,
      "Nat Geo": NatGeo,
      "Grayscale": Gray,
      "Dark Gray": DarkGray,
      "Imagery": Imagery
    };
    const layerChoice = {
      "Cambridge": myLayerGroup.getLayer('imperviousLayer'),
      "Area 4": myLayerGroup.getLayer('area4')
    };
    const layerControl = new control.layers(baseMaps, layerChoice, {
      position: controlsPosition
    });
    return layerControl;
  
  }
  
  function getSearchControl() {
    var arcgisOnline = arcgisOnlineProvider();
    var providers = [arcgisOnline];
  
    for (var i = 0; i < searchProviders.length; i++) {
      providers.push(new FeatureLayerProvider(searchProviders[i]));
    }
  
    var searchControl = new geosearch({
      placeholder: "Search for locations",
      useMapBounds: false,
      position: controlsPosition,
      providers: providers
    });
    return searchControl;
  }
  
  function getLegend() {
  
    var legend = control({ position: 'bottomright' });
    legend.onAdd = function () {
  
      var div = DomUtil.create('div', 'info legend'),
        grades = [0, 16.77, 40.78, 60.84, 76.98],
        labels = [];
      div.innerHTML = "<div><strong>Percent Impervious</strong></div>";
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i].toFixed(2) + "%" + (grades[i + 1] ? '&ndash;' + grades[i + 1].toFixed(2) + "%" + '<br>' : '+');
      }
  
      return div;
    }
  
    return legend;
  }

  export {getLegend, getSearchControl, getLayerControl, getZoomHome};