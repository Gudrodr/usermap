import * as React from 'react';
import './assets/styles.scss';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import {LineString, Point} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {fromLonLat, toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.popup = React.createRef();
  }

  componentDidMount() {
    const features = this.props.features;

    const featuresData = features.map(item => {
      if (item.properties) {
        let user = new Feature({
          geometry: new Point(fromLonLat(item.geometry.coordinates))
        });
        user.setStyle(new Style({
          image: new CircleStyle({
            radius: 4,
            fill: new Fill({color: item.properties.color})
          })
        }));
        user.setId(item.id);
        user.email = item.properties.email;
        user.name = item.properties.userName;
        return user;
      }
    });

    featuresData.splice(-1, 1);

    console.log('features', featuresData);

    const vectorSource = new VectorSource({
      features: featuresData
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        vectorLayer
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });

    const popup = new Overlay({
      element: this.popup.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    map.addOverlay(popup);

    const featureListener = function ( event ) {
      console.log(event.tar);
    };

    map.on('click', function(event) {

      map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        console.log(feature.email);
        // featureListener(event);
      });
    });
  }

  render() {
    console.log(this.props.features)
    return(
      <div id='map' className='map'>
        <div ref={this.popup} />
      </div>
    )
  }
}