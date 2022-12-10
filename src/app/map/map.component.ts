import { Component, OnInit } from '@angular/core';
import { IRoutableComponent } from 'src/app/interfaces/IRoutableComponent';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Cluster, OSM } from 'ol/source';
import { fromLonLat, transform } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import MapEventType from 'ol/MapEventType';
import { Coordinate } from 'ol/coordinate';
import { MapDataService } from 'src/app/services/store-services/map-data.service';
import { Stop, StopsService, VehicleType } from 'src/app/services/stops.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, IRoutableComponent {
  map: Map;
  view: View;


  centerLat: number = 50.0660383;
  centerLon: number = 19.9466524;
  zoom: number = 14;
  stops: Stop[] = [];
  stopFeatures: Feature[] = [];

  private stopDotRadius: number = 5;
  private dotClusterRadius: number = 10;
  private selectedStopDotRadius: number = 8;

  private colors = {
    0: { fill: '#98F5AA', stroke: '#6BB5F5' },
    1: { fill: '#5F77F5', stroke: '#3D5CF5' },
    2: { fill: '#F55F76', stroke: '#F53D59' },
    4: { fill: '#5FF57D', stroke: '#3DF562' },
    8: { fill: '#F5CF5F', stroke: '#F5C73D' }
  }

  private stopStyles: { [key: string]: Style } = {};

  source = new VectorSource();

  clusterSource = new Cluster({
    distance: 0,
    minDistance: 0,
    source: this.source,
  });

  private styleCache = {};
  private stopLayer: VectorLayer<Cluster>;

  constructor(private mapDataService: MapDataService, private stopsService: StopsService) {
    for (let key in this.colors) {
      let value = this.colors[key];
      this.stopStyles['s_' + key] = new Style({
        image: new CircleStyle({
          radius: this.stopDotRadius,
          fill: new Fill({ color: value.fill }),
          stroke: new Stroke({ color: value.stroke, width: 1 }),
        }),
      });
      this.stopStyles['c_' + key] = new Style({
        image: new CircleStyle({
          radius: this.dotClusterRadius,
          fill: new Fill({ color: value.fill }),
          stroke: new Stroke({ color: value.stroke, width: 1 }),
        }),
      });
      this.stopStyles['sel_' + key] = new Style({
        image: new CircleStyle({
          radius: this.selectedStopDotRadius,
          fill: new Fill({ color: value.fill }),
          stroke: new Stroke({ color: value.stroke, width: 1 }),
        }),
      });
    }
  }

  showBackArrow: boolean = true;
  toolbarTitle: string = "Mapa";
  onRouteIn() {
    this.mapDataService.restore(this);
    this.reloadStopFeatures();
  }
  onRouteOut() {
    this.mapDataService.store(this);
  }

  reloadStopFeatures() {
    this.source.clear();
    if (!this.stops || this.stops.length == 0)
      return;
    this.stopFeatures = this.stops.map((stop) => new Feature(
      {
        'geometry': new Point(fromLonLat([stop.longitude, stop.latitude])),
        'groupId': stop.groupId,
        'gtfsId': stop.gtfsId,
        'name': stop.name,
        'type': stop.type
      }
    ));
    this.source.addFeatures(this.stopFeatures);
  }

  ngOnInit() {
    if (this.stops.length == 0) {
      this.stopsService.getStops().subscribe(s => {
        this.stops = s;
        this.reloadStopFeatures();
      });
    }

    this.stopLayer = new VectorLayer({
      source: this.clusterSource,
      style: (function (feature) {
        const subFeatures = feature.get('features');
        const size = subFeatures.length;
        if (size > 1) {
          return this.stopStyles['c_0'];
        }

        return this.stopStyles['s_' + subFeatures[0].get('type')];
      }).bind(this),
    });

    this.view = new View({
      center: fromLonLat([this.centerLon, this.centerLat]),
      zoom: this.zoom
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.stopLayer
      ],
      view: this.view
    });
    (<any>this.map).on(MapEventType.MOVEEND, (e) => {
      let coord = this.getCenterCoord(e.map);
      this.centerLon = coord[0];
      this.centerLat = coord[1];
      this.zoom = this.view.getZoom();
    });
  }

  getCenterCoord(map: Map): Coordinate {
    let origCenter = map.getView().getCenter();
    return transform(origCenter, 'EPSG:3857', 'EPSG:4326');
  }
}
