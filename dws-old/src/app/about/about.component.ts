import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
      center: [17.63, 100.15],
      zoom: 12
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
      // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: '	th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const ud_ortho = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'utd:urban',
      format: 'image/png',
      transparent: true,
    });

    const ud_aquifer = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_aquifer',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_forest_c = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_forest_c',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_forest_c_gistda = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_forest_c_gistda',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_geo_stc = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_geo_stc',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_geology = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_geology',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_landuse2555_4326 = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_landuse2555_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_municipal_4326 = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_municipal_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_pb_soil = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_pb_soil',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_pump = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_pump',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_pwa_vill = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_pwa_vill',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_soil_suit = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_soil_suit',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_stream = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_stream',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_trans = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_trans',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_village = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_village',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_well = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_well',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_wshd_cl = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_wshd_cl',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
    });

    const ud_wtr_body = L.tileLayer.wms('http://cgi.uru.ac.th/geoserver/gwc/service/wms?', {
      layers: 'ud:ud_wtr_body',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
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
      'ขอบเขตจังหวัด': pro.addTo(this.map),
      'ขอบเขตอำเภอ': amp.addTo(this.map),
      'ขอบเขตตำบล': tam.addTo(this.map),
      'ภาพถ่ายทางอากาศ': ud_ortho,
      'ชั้นหินให้น้ำ': ud_aquifer,
      'ขอบเขตป่าไม้': ud_forest_c_gistda,
      'รอยเลื่อน': ud_geo_stc,
      'ลักษณะทางธรณีวิทยา': ud_geology,
      'การใช้ประโยชน์ที่ดินปี 2555': ud_landuse2555_4326,
      'ขอบเขตเทศบาล': ud_municipal_4326,
      'ลักษณะของดิน': ud_pb_soil,
      'ตำแหน่งสูบน้ำด้วยไฟฟ้า': ud_pump,
      'ประปาหมู่บ้าน': ud_pwa_vill,
      // 'ความเหมาะสมเพาะปลูกพืช': ud_soil_suit,
      'ชั้นคุณภาพลุ่มน้ำ': ud_wshd_cl,
      'แหล่งน้ำผิวดิน': ud_wtr_body,
      'เส้นลำน้ำ': ud_stream,
      'เส้นทางคมนาคม': ud_trans,
      'ตำแหน่งหมู่บ้าน': ud_village,
      'ตำแหน่งบ่อบาดาล': ud_well,
    };

    L.control.layers(baseMap, overLay).addTo(this.map)

  }

}
