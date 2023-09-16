import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
// import * as esri from 'esri-leaflet';
import { ServiceService } from '../service.service';
import { MarkerService } from '../marker.service';

interface ExtendedMarkerOptions extends L.MarkerOptions {
  iconName: string;
}

@Component({
  selector: 'app-drought',
  templateUrl: './drought.component.html',
  styleUrls: ['./drought.component.scss']
})
export class DroughtComponent implements OnInit {

  public map: any;
  public time: any;

  constructor(
    public service: ServiceService,
    public markerService: MarkerService
  ) { }

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.map = new L.Map('map', {
      center: [17.80, 100.29],
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

    // const topo = esri.tiledMapLayer({
    //   url: 'https://gistdaportal.gistda.or.th/data/rest/services/L11_TopographicMap/L11_topographicmap/ImageServer',
    //   opacity: 0.6
    // })

    // const ortho = esri.tiledMapLayer({
    //   url: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_RASTER_WM_CACHE/MapServer',
    //   opacity: 0.8
    // })

    // const esri = L.esri.basemapLayer('Topographic');

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
      // CQL_FILTER: 'pro_code=53'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: '	th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=53'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=53'
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

    var markers = L.layerGroup();

    const redIcon = L.icon({
      iconUrl: this.markerService.redIcon,
      iconSize: [32, 32],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    L.marker([17.764226470530343, 100.30699056090818], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('ห้วยชมพู หมู่ 3').addTo(markers);

    L.marker([17.827797457778072, 100.28712071501512], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('อ่างครกสิ่ว หมู่ 11').addTo(markers);

    L.marker([17.754964060160084, 100.30692328923081], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('สระหลวง หมู่ 5').addTo(markers);

    L.marker([17.839825492816185, 100.2994170005235], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('สระสาธารณะ หมู่ 7 บ้านผาลาด').addTo(markers);

    L.marker([17.76129841970965, 100.28926615823673], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 5 ซอยม่อนป่าสัก').addTo(markers);

    L.marker([17.760109234863673, 100.3050932112502], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 5 ประปาหมู่บ้าน').addTo(markers);

    L.marker([17.76386825842492, 100.30785567641128], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 3 ประปาหมู่บ้าน').addTo(markers);

    L.marker([17.766691802084793, 100.30046275130273], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 9 ซอยบ้านหล่าย').addTo(markers);

    L.marker([17.782457202536424, 100.29425686745113], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 2 ประปาหมู่บ้าน').addTo(markers);

    L.marker([17.78915759616436, 100.28954142402674], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 2 ประปาหมู่บ้าน').addTo(markers);

    L.marker([17.794863847749287, 100.29305388457895], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 12 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.799905536119915, 100.2931939651046], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 12 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.817821566204543, 100.29109653897663], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 1 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.818508397751664, 100.2924600717766], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 1 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.847478074608226, 100.26109552436112], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 8 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.837119438297222, 100.28637622115933], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 11 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.85317671940711, 100.2700249017504], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 8 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.852203351744926, 100.2696216615794], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 8 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.85841430793434, 100.27477104339503], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 8 ระบบประปาหมู่บ้าน').addTo(markers);

    L.marker([17.869057047562965, 100.26965636224581], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมุ่ 8 ระบบประปาหมู่บ้าน (บ้าน ผญ.เนียม ปานานนท์)').addTo(markers);

    L.marker([17.864110806944336, 100.29893275925714], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 10 ระบบประปาหมู่บ้าน(สำนักสงฆ์ทรายงาม)').addTo(markers);

    L.marker([17.86137609823194, 100.29841274260883], {
      icon: redIcon,
      iconName: 'strmSta'
    } as ExtendedMarkerOptions).bindPopup('หมู่ 10 ระบบประปาหมู่บ้าน(รร.ทรายงาม)').addTo(markers);

    const baseMap = {
      แผนที่ถนน: grod,
      แผนที่ภูมิประเทศ: gter.addTo(this.map),
      แผนที่ผสม: ghyb,
      // แผนที่ESRI: esri
    };

    const overLay = {
      // 'ภาพถ่ายทางอากาศ': ortho,
      // 'ภาพถ่ายทางอากาศ': ud_ortho,
      // 'แผนที่1:50000': topo,
      'ขอบเขตจังหวัด': pro,
      'ขอบเขตอำเภอ': amp.addTo(this.map),
      'ขอบเขตตำบล': tam.addTo(this.map),
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
      'สระน้ำ': markers.addTo(this.map)
    };

    L.control.layers(baseMap, overLay).addTo(this.map)

  }

}
