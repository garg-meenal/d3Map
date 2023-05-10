import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as d3 from 'd3v4';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {

  map: mapboxgl.Map;
  //style = 'mapbox://styles/mapbox/light-v11';
  style= 'mapbox://styles/mapbox/streets-v9';
  //style = 'mapbox://styles/mapbox/terrain-v9';

  parks = {
    "features": [
      {
        "type": "Feature",
        "properties": {
          "title": "Lincoln Park",
          "description": "A northside park that is home to the Lincoln Park Zoo"
        },
        "geometry": {
          "coordinates": [-87.637596, 41.940403],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Burnham Park",
          "description": "A lakefront park on Chicago's south side"
        },
        "geometry": {
          "coordinates": [-87.603735, 41.829985],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Millennium Park",
          "description": "A downtown park known for its art installations and unique architecture"
        },
        "geometry": {
          "coordinates": [-87.622554, 41.882534],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Grant Park",
          "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
        },
        "geometry": {
          "coordinates": [-87.619185, 41.876367],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Humboldt Park",
          "description": "A large park on Chicago's northwest side"
        },
        "geometry": {
          "coordinates": [-87.70199, 41.905423],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Douglas Park",
          "description": "A large park near in Chicago's North Lawndale neighborhood"
        },
        "geometry": {
          "coordinates": [-87.699329, 41.860092],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Calumet Park",
          "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
        },
        "geometry": {
          "coordinates": [-87.530221, 41.715515],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Jackson Park",
          "description": "A lakeside park that was the site of the 1893 World's Fair"
        },
        "geometry": {
          "coordinates": [-87.580389, 41.783185],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "title": "Columbus Park",
          "description": "A large park in Chicago's Austin neighborhood"
        },
        "geometry": {
          "coordinates": [-87.769775, 41.873683],
          "type": "Point"
        }
      }
    ],
    "type": "FeatureCollection"
  };
  
  constructor() { }

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ',
      container: 'map',
      style: this.style,
      center: [-97, 30], // starting position
      zoom: 3, // starting zoom
    });

    

    this.map.on('load', () => {
      this.loadBlackDots();
      this.loadCatImage();
    });
  }
  loadBlackDots() {
    this.map.addLayer({
      id: 'circle-layer',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.parks.features
        }
      },
      paint: {
        'circle-color': 'black',
        'circle-radius':10
      }
    });
  }
  loadCatImage() {
    //https://docs.mapbox.com/mapbox-gl-js/example/add-image/
    //https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/

    this.map.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
      (error, image) =>{
        if(error) console.log(error);
        this.map.addImage('cat', image);

        this.map.addSource('symbol-source',{
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                "type": "Feature",
                "properties": {
                  "title": "Columbus Park1",
                  "description": "A large park in Chicago's Austin neighborhood"
                },
                "geometry": {
                  "coordinates": [-92.769775, 41.873683],
                  "type": "Point"
                }
              },
              {
                "type": "Feature",
                "properties": {
                  "title": "Columbus Park2",
                  "description": "A large park in Chicago's Austin neighborhood"
                },
                "geometry": {
                  "coordinates": [-92.769775, 44.873683],
                  "type": "Point"
                }
              } 
            ]
          }
        });
        this.map.addLayer({
          id: 'symbol-layer',
          type: 'symbol',
          source: 'symbol-source',
          layout: {
            'icon-image': 'cat',
            'icon-size':0.1,
            'icon-anchor': 'center',
            'text-field': ['get', 'title'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
          }
        });
      });
  }
  

}
