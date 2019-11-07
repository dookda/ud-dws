import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';
// import { AngularFirestore } from '@angular/fire/firestore';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public map: any;
  public streamShow = false;
  public rainShow = false;
  public stName: any;
  public stDesc: any;
  public stLat: any;
  public stLon: any;
  public stImg: any;

  public rain: any;
  public rh: any;
  public slp: any;

  public rhLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public rhData = [120, 150, 180, 90];
  public rhType = 'doughnut';

  constructor(
    public service: ServiceService,
    public markerService: MarkerService,
    // public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.loadMap();
    // this.showWeather();
  }

  async loadMap() {
    this.map = new L.Map('map', {
      center: [17.707829, 100.002905],
      zoom: 13
    });

    const mbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy;',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiY3NrZWxseSIsImEiOiJjamV1NTd1eXIwMTh2MzN1bDBhN3AyamxoIn0.Z2euk6_og32zgG6nQrbFLw'
    });

    const grod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const gter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // overlay map
    const mapUrl = 'http://map.nu.ac.th/geoserver-hgis/ows?';
    const cgiUrl = 'http://www.cgi.uru.ac.th/geoserver/ows?';
    const w3Url = 'http://www3.cgistln.nu.ac.th/geoserver/gistdata/ows?';
    const firms = 'https://firms.modaps.eosdis.nasa.gov/wms?';

    const pro = L.tileLayer.wms(cgiUrl, {
      layers: 'th:province_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: 'th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const stream = L.tileLayer.wms(cgiUrl, {
      layers: 'upn:ll_stream',
      format: 'image/png',
      transparent: true,
      zIndex: 5
    });

    const rainInterp = L.tileLayer.wms(w3Url, {
      layers: 'gistdata:geotiff_coverage',
      format: 'image/png',
      transparent: true,
      zIndex: 1
    });

    const strmSta = await L.layerGroup();
    const rainSta = await L.layerGroup();

    const baseMap = {
      แผนที่ถนน: grod,
      แผนที่ภูมิประเทศ: gter.addTo(this.map),
      แผนที่ผสม: ghyb
    };

    const overLay = {
      ขอบเขตจังหวัด: pro.addTo(this.map),
      ขอบเขตอำเภอ: amp.addTo(this.map),
      ขอบเขตตำบล: tam.addTo(this.map),
      เส้นลำน้ำ: stream.addTo(this.map),
      สถานีตรวจวัดปริมาณน้ำฝน: rainSta.addTo(this.map),
      ตำแหน่งวัดปริมาณน้ำท่า: strmSta.addTo(this.map)
    };

    L.control.layers(baseMap, overLay).addTo(this.map);

    // const blueIcon = await this.service.blueIcon;
    const blueIcon = L.icon({
      iconUrl: await this.markerService.blueIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    const greenIcon = L.icon({
      iconUrl: await this.markerService.greenIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    const grayIcon = L.icon({
      iconUrl: await this.markerService.grayIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    // this.service.getCheckpoint();
    // const station = this.firestore.collection('station');
    // station.get().subscribe((snapshot) => {
    //   const sList = snapshot.docs.map(doc => ({ ...doc.data() }));

    //   sList.forEach(poi => {
    //     // console.log(poi.lat);
    //     const latlng = L.latLng(poi.lat, poi.lon);
    //     const marker = L.marker(latlng, {
    //       icon: blueIcon,
    //       iconName: 'strmSta'
    //     });
    //     marker.addTo(this.map);
    //     marker.bindPopup(poi.location).openPopup();
    //   });

    // });

    this.service.getCheckpoint().then((res: any) => {
      const marker = L.geoJSON(res, {
        pointToLayer: (feature: any, latlon: any) => {
          return L.marker(latlon, {
            icon: blueIcon,
            iconName: 'strmSta'
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          // console.log(feature);
          if (feature.properties) {
            layer.bindPopup(
              `${feature.properties.sta_addres}`, {
              maxWidth: '300'
            }
            );
          }
        }
      });
      marker.on('click', (e: any) => {
        // this.showStreamDetail(e);

        this.showWeather(e);
      });
      marker.addTo(strmSta);
    });

    // tslint:disable-next-line: max-line-length
    // const staList = ['530100-001', '530102-001', '530104-001', '530105-001', '530106-001', '530107-001', '530108-001', '530110-001', '530112-001', '530113-001', '530114-001', '530115-001', '530116-001', '530200-001', '530201-001', '530202-001', '530202-002', '530203-001', '530204-001', '530205-001', '530301-001', '530301-002', '530303-001', '530303-002', '530304-001', '530305-001', '530306-001', '530308-001', '530400-001', '530401-001', '530402-001', '530403-001', '530404-001', '530405-001', '530405-002', '530406-001', '530500-001', '530501-001', '530502-001', '530503-001', '530504-001', '530600-001', '530601-001', '530603-001', '530604-001', '530701-001', '530701-002', '530702-001', '530703-001', '530704-001', '530704-002', '530705-001', '530706-001', '530707-001', '530708-001', '530709-001', '530710-001', '530711-001', '530801-001', '530801-002', '530802-001', '530802-002', '530802-003', '530802-004', '530802-005', '530802-006', '530802-007', '530802-008', '530803-001', '530804-001', '530804-002', '530805-001', '530806-001', '530807-001', '530807-002', '530808-001', '530900-001', '530901-001', '530902-001', '530903-001', '530904-001', '670312-001', '670402-001', '540118-001', '540702-001', '640505-001', '500513-001', '540702-001', '540118-001'];
    // staList.forEach((value, index, array) => {
    //   this.service.getMeteoService(value).then((res: any) => {
    //     console.log(res);
    //     const data = res.current_observation;
    // const str = res.current_observation.observation_time._text;
    // const latlon = L.latLng(Number(res.current_observation.latitude._text), res.current_observation.longitude._text);
    // const marker = L.marker(latlon, {
    //   icon: greenIcon,
    //   iconName: 'rainSta'
    // });
    // marker.properties = res.current_observation;
    // marker.bindPopup(
    //   `ชื่อ station: ${res.current_observation.station_id._text}<br>
    //  สถานที่: ${res.current_observation.location._text}<br>`
    // );
    // marker.on('click', (e: any) => {
    //   this.showRainDetail(e);
    // });
    // marker.addTo(rainSta);
    //   });
    // });
  }

  showWeather(e: any) {
    const id = e.sourceTarget.feature.properties.id;
    this.service.getWeather(id).then((res: any) => {
      console.log(res);

      this.rhLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
      this.rhData = [120, 150, 180, 90];
      this.rhType = 'doughnut';
    });
  }

  showStreamDetail(e: any) {
    this.streamShow = true;
    this.rainShow = false;
    this.stName = e.sourceTarget.feature.properties.sta_addres;
    this.stLat = e.sourceTarget.feature.properties.lat;
    this.stLon = e.sourceTarget.feature.properties.lon;
    this.stImg = `http://cgi.uru.ac.th/dws-resources/${e.sourceTarget.feature.properties.img}`;
    this.map.panTo(e.latlng);
  }

  showRainDetail(e: any) {
    console.log(e);
    this.rainShow = true;
    this.streamShow = false;
    this.stName = e.sourceTarget.properties.location._text;
    this.stLat = e.sourceTarget.properties.latitude._text;
    this.stLon = e.sourceTarget.properties.longitude._text;
    this.stDesc = e.sourceTarget.properties;
    this.map.panTo(e.latlng);
  }

}
