export function area4Style(feature) {
    return {
        fillColor: 'red',
        weight: 4,
        opacity: 1,
        color: 'black',
    }
  };
  
  export function hexStyle(feature) {
    return {
        fillColor: getColor(feature.properties.ImpervPct),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
  }
  
  export function getColor(d) {
    return d <= 16.777 ? '#f1eef6' :
        d <= 40.7839 ? '#bdc9e1' :
        d <= 60.8447 ? '#74a9cf' :
        d <= 76.9893 ? '#2b8cbe' :
        d <= 100 ? '#045a8d' :
        '#FFEDA0';
  }

