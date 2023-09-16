import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-satmeteo',
  templateUrl: './satmeteo.component.html',
  styleUrls: ['./satmeteo.component.scss']
})
export class SatmeteoComponent implements OnInit {

  public map: any;
  public time: any;
  public satTime: any;

  constructor(
    public service: ServiceService
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = new L.Map('map', {
      center: [17.73, 100.55],
      zoom: 6
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
      zIndex: 500,
      // // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: '	th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 500,
      // // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 500,
      // // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const radarLyrs = L.featureGroup();
    this.service.getRadars().then((res: any) => {
      const rlength = res.radars.length - 1;
      const data = res.radars[rlength];
      // console.log(data)
      const dt = new Date(data.time * 1000);
      const HR = dt.getHours();
      const M = '0' + dt.getMinutes();
      this.time = HR + ':' + M.substr(-2) + ' น.';
      data.sources.forEach((e: any) => {
        const radarLyr = L.imageOverlay(e.url, [
          [e.coordinates.topright.lat, e.coordinates.topright.lng],
          [e.coordinates.bottomleft.lat, e.coordinates.bottomleft.lng]
        ], { zIndex: 3 }
        );
        radarLyrs.addLayer(radarLyr);
      });
    });

    const d = new Date();
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const hr = h > 10 ? String(h) : '0' + String(h);
    const mm = m < 10 ? '40' : m < 20 ? '50' : m < 30 ? '00' : m < 40 ? '10' : m < 50 ? '20' : '30';
    const hrmm = hr + mm;
    this.satTime = String(d.getHours()) + ':' + mm;

    const imgUrl = 'https://www.data.jma.go.jp/mscweb/data/himawari/';
    const b03 = imgUrl + 'img/r2w/r2w_b03_' + hrmm + '.jpg';
    const b07 = imgUrl + 'img/r2w/r2w_b07_' + hrmm + '.jpg';
    const b08 = imgUrl + 'img/r2w/r2w_b08_' + hrmm + '.jpg';
    const b13 = imgUrl + 'img/r2w/r2w_b13_' + hrmm + '.jpg';
    const arm = imgUrl + 'img/r2w/r2w_arm_' + hrmm + '.jpg';
    const dnc = imgUrl + 'img/r2w/r2w_dnc_' + hrmm + '.jpg';
    const dms = imgUrl + 'img/r2w/r2w_dms_' + hrmm + '.jpg';
    const tre = imgUrl + 'img/r2w/r2w_tre_' + hrmm + '.jpg';
    const cve = imgUrl + 'img/r2w/r2w_cve_' + hrmm + '.jpg';
    const ngt = imgUrl + 'img/r2w/r2w_ngt_' + hrmm + '.jpg';
    const dst = imgUrl + 'img/r2w/r2w_dst_' + hrmm + '.jpg';
    const dsl = imgUrl + 'img/r2w/r2w_dsl_' + hrmm + '.jpg';
    const snd = imgUrl + 'img/r2w/r2w_snd_' + hrmm + '.jpg';
    const vir = imgUrl + 'img/r2w/r2w_vir_' + hrmm + '.jpg';
    const irv = imgUrl + 'img/r2w/r2w_irv_' + hrmm + '.jpg';
    const trm = imgUrl + 'img/r2w/r2w_trm_' + hrmm + '.jpg';
    const hrp = imgUrl + 'img/r2w/r2w_hrp_' + hrmm + '.jpg';

    const bbox = L.latLngBounds(L.latLng(30.00, 165.00), L.latLng(-15.00, 90.00));
    const opts = { opacity: 0.6 };

    console.log(b03);

    const b03Lyr = L.imageOverlay(b03, bbox, opts);
    const b07Lyr = L.imageOverlay(b07, bbox, opts);
    const b08Lyr = L.imageOverlay(b08, bbox, opts);
    const b13Lyr = L.imageOverlay(b13, bbox, opts);
    const armLyr = L.imageOverlay(arm, bbox, opts);
    const dncLyr = L.imageOverlay(dnc, bbox, opts);
    const dmsLyr = L.imageOverlay(dms, bbox, opts);
    const treLyr = L.imageOverlay(tre, bbox, opts);
    const cveLyr = L.imageOverlay(cve, bbox, opts);
    const ngtLyr = L.imageOverlay(ngt, bbox, opts);
    const dstLyr = L.imageOverlay(dst, bbox, opts);
    const dslLyr = L.imageOverlay(dsl, bbox, opts);
    const sndLyr = L.imageOverlay(snd, bbox, opts);
    const virLyr = L.imageOverlay(vir, bbox, opts);
    const irvLyr = L.imageOverlay(irv, bbox, opts);
    const trmLyr = L.imageOverlay(trm, bbox, opts);
    const hrpLyr = L.imageOverlay(hrp, bbox, opts);

    const baseMap = {
      แผนที่ถนน: grod,
      แผนที่ภูมิประเทศ: gter.addTo(this.map),
      แผนที่ผสม: ghyb
    };

    const overLay = {
      'เรดาห์ฝน กรมอุตุฯ': radarLyrs,
      'Visible': b03Lyr,
      'Short Wave Infrared': b07Lyr,
      'Water Vapor': b08Lyr,
      'Infrared': b13Lyr,
      'Airmass RGB': armLyr,
      'Natural Color RGB': dncLyr,
      'Day Microphysics RGB': dmsLyr,
      'True Color RGB (Enhanced)': treLyr,
      'Day Convective Storm RGB': cveLyr,
      'Night Microphysics RGB': ngtLyr,
      'Dust RGB': dstLyr,
      'Day Snow-Fog RGB': dslLyr,
      'Sandwich': sndLyr,
      'B03 combined with B13': virLyr,
      'B03 and B13 at night': irvLyr,
      'True Color Reproduction Image': trmLyr,
      'Heavy rainfall potential areas': hrpLyr.addTo(this.map),
      'ขอบเขตจังหวัด': pro.addTo(this.map),
      'ขอบเขตอำเภอ': amp.addTo(this.map),
      'ขอบเขตตำบล': tam.addTo(this.map)
    };

    L.control.layers(baseMap, overLay).addTo(this.map)

  }

}
