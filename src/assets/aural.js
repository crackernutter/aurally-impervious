const images = require.context('../sounds', true);
const imagePath = (name) => images(name, true);

export default function onPress(e) {
    var pctimp = e.layer.feature.properties.ImpervPct;
    e.layer.bringToFront();
    e.layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    var sound = getSound(pctimp);
    //new Audio(`./sounds/${sound}.mp3`).play();
    new Audio(sound).play();
  }
  
  function getSound(d) {
    return d <= 16.777 ? imagePath('./bell1.mp3') :
      d <= 40.7839 ? imagePath('./bell2.mp3') :
        d <= 60.8447 ? imagePath('./bell3.mp3') :
          d <= 76.9893 ? imagePath('./bell4.mp3') :
            d <= 100 ? imagePath('./bell5.mp3') :
            imagePath('./bell5.mp3');
  }