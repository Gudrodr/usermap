import * as React from 'react';
import './assets/styles.scss';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.popup = React.createRef();
    this.content = React.createRef();
    this.closer = React.createRef();
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
            radius: 5,
            fill: new Fill({color: item.properties.color})
          })
        }));
        user.email = item.properties.email;
        user.name = item.properties.userName;
        return user;
      }
    });

    featuresData.splice(-1, 1);

    const vectorSource = new VectorSource({
      features: featuresData
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const content = this.content.current;

    const overlay = new Overlay({
      element: this.popup.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.closer.current.onclick = function() {
      overlay.setPosition(undefined);
      this.closer.current.blur();
      return false;
    };

    const map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        vectorLayer
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 3
      })
    });

    map.on('singleclick', function(evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          return feature;
        });
      if (feature) {
        const coordinate = evt.coordinate;
        content.innerHTML = `${feature.name}<br/>${feature.email}`;
        overlay.setPosition(coordinate);
      }
    });
  }

  render() {
    return(
      <div id='map' className='map'>
        <div ref={this.popup} className="ol-popup">
          <span ref={this.closer} className="ol-popup-closer" />
          <div ref={this.content} />
        </div>
      </div>
    )
  }
}