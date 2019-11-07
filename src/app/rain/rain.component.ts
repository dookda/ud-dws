import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss']
})
export class RainComponent implements OnInit {
  public map: any;
  public time: any;

  constructor(
    public service: ServiceService
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = new L.Map('map', {
      center: [17.73, 100.55],
      zoom: 8
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
      layers: '	th:amphoe_4326',
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


    const radarLyrs = L.featureGroup();

    this.service.getRadars().then((res: any) => {

      const rlength = res.radars.length - 1;
      const data = res.radars[rlength];
      console.log(data);
      const dt = new Date(data.time * 1000);
      const hr = dt.getHours();
      const m = '0' + dt.getMinutes();
      this.time = hr + ':' + m.substr(-2) + ' น.';

      data.sources.forEach((e: any) => {
        // tslint:disable-next-line: max-line-length
        const radarLyr = L.imageOverlay(e.url, [[e.coordinates.topright.lat, e.coordinates.topright.lng], [e.coordinates.bottomleft.lat, e.coordinates.bottomleft.lng]]);
        radarLyrs.addLayer(radarLyr);

      });

    });

    // const rainInterp = L.tileLayer.wms(w3Url, {
    //   layers: 'gistdata:geotiff_coverage',
    //   format: 'image/png',
    //   transparent: true,
    //   zIndex: 1
    // });

    const baseMap = {
      แผนที่ถนน: grod,
      แผนที่ภูมิประเทศ: gter.addTo(this.map),
      แผนที่ผสม: ghyb
    };


    const overLay = {
      'เรดาห์ฝน กรมอุตุฯ': radarLyrs.addTo(this.map),
      ขอบเขตจังหวัด: pro.addTo(this.map),
      ขอบเขตอำเภอ: amp.addTo(this.map),
      ขอบเขตตำบล: tam.addTo(this.map)
    };

    L.control.layers(baseMap, overLay).addTo(this.map)

  }

}
