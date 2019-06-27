import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { mapbox } from '../config';

mapboxgl.accessToken = mapbox.token;

class Map extends React.Component {
  componentDidMount () {
    const { zoom, coordinates } = this.props;

    const usingDefaultCoordinates = coordinates[0] === 0 && coordinates[1] === 0;

    this.map = new mapboxgl.Map({
      center: coordinates,
      container: this.mapContainer,
      style: mapbox.baseStyle,
      zoom: zoom || 8
    });

    const defaultMode = usingDefaultCoordinates ? 'draw_point' : 'simple_select';

    this.draw = new MapboxDraw({
      defaultMode,
      controls: {
        point: true,
        line_string: false,
        polygon: false,
        trash: false,
        combine_features: false,
        uncombine_features: false
      }
    });

    this.geocoder = new MapboxGeocoder({ accessToken: mapbox.token });

    this.map.addControl(this.draw, 'top-left');
    this.map.addControl(this.geocoder, 'bottom-left');

    this.map.on('load', () => {
      if (!usingDefaultCoordinates) {
        console.log('first point', this.draw.add({
          type: 'Point',
          coordinates
        }));
      }
    });

    const updateCoordinates = (e) => {
      const data = this.draw.getAll();
      const { features } = data;
      const point = usingDefaultCoordinates ? features[features.length - 1] : features[0];

      features.forEach((feature) => {
        if (feature.id === point.id) {
          const [longitude, latitude] = point.geometry.coordinates;
          this.props.onChange({ longitude, latitude });
          return;
        }

        this.draw.delete(feature.id);
      });
    };

    this.map.on('draw.create', updateCoordinates);
    this.map.on('draw.delete', updateCoordinates);
    this.map.on('draw.update', updateCoordinates);
  }

  componentWillUnmount () {
    this.map.remove();
  }

  render () {
    const { width, height } = this.props;

    return (
      <div className='map'>
        <div
          className='map__container'
          ref={(el) => (this.mapContainer = el)}
          style={{ width, height }}
        >
        </div>
      </div>
    );
  }
}

export default Map;
