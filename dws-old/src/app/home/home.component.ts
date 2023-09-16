import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import * as esri from 'esri-leaflet';
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
  public layerControl: any;
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

  public station01Rain: any;
  public station01Runoff: any;
  public station02Rain: any;
  public station02Runoff: any;
  public station03Rain: any;
  public station03Runoff: any;
  public station04Rain: any;
  public station04Runoff: any;
  public station05Rain: any;
  public station05Runoff: any;

  public rhLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public rhData = [120, 150, 180, 90];
  public rhType = 'doughnut';

  public iconGreen = "./assets/images/green.svg";
  public iconRed = "./assets/images/red.svg";
  public iconOrange = "./assets/images/orange.svg";
  public info = "./assets/images/info.svg";

  public badge01: any;
  public badge02: any;
  public badge03: any;
  public badge04: any;
  public badge05: any;

  constructor(
    public service: ServiceService,
    public markerService: MarkerService,
    // public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.loadMap();
    // this.showWeather();
    this.map = new L.Map('map', {
      center: [17.707829, 100.002905],
      zoom: 12
    });
  }

  async loadMap() {
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

    // const topo = L.tileLayer.wms('http://202.29.52.232/geoserver/gwc/service/wms', {
    //   layers: 'ud:ud_topo',
    //   format: 'image/png',
    //   transparent: true,
    //   zIndex: 5,
    //   opacity: 0.8
    // });

    // const topo = esri.tiledMapLayer({
    //   url: 'https://gistdaportal.gistda.or.th/data/rest/services/L11_TopographicMap/L11_topographicmap/ImageServer',
    //   opacity: 0.6
    // })

    const pro = L.tileLayer.wms(cgiUrl, {
      layers: 'th:province_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=53 OR pro_code=54 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: 'th:amphoe_4326',
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

    const basin = L.tileLayer.wms(cgiUrl, {
      layers: 'ud:maeprong_basin_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5
    });

    const stream = L.tileLayer.wms(cgiUrl, {
      layers: 'upn:ll_stream',
      format: 'image/png',
      transparent: true,
      zIndex: 5
    });

    const village = L.tileLayer.wms(cgiUrl, {
      layers: 'upn:ll_village',
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

    // const overLay = {
    //   // : ,
    //   ขอบเขตอำเภอ: amp.addTo(this.map),
    //   ขอบเขตตำบล: tam.addTo(this.map),
    //   ขอบเขตลุ่มน้ำ: basin.addTo(this.map),
    //   เส้นลำน้ำ: stream.addTo(this.map),
    //   หมู่บ้าน: village.addTo(this.map),
    //   สถานีตรวจวัดปริมาณน้ำฝน: rainSta.addTo(this.map),
    //   ตำแหน่งวัดปริมาณน้ำท่า: strmSta.addTo(this.map),

    // };

    this.layerControl = L.control.layers(baseMap).addTo(this.map);
    // this.layerControl.addOverlay(topo.addTo(this.map), 'แผนที่1:50000');
    this.layerControl.addOverlay(pro.addTo(this.map), 'ขอบเขตจังหวัด');
    this.layerControl.addOverlay(amp.addTo(this.map), 'ขอบเขตอำเภอ');
    this.layerControl.addOverlay(tam.addTo(this.map), 'ขอบเขตตำบล');
    this.layerControl.addOverlay(basin.addTo(this.map), 'ขอบเขตลุ่มน้ำ');
    this.layerControl.addOverlay(stream.addTo(this.map), 'เส้นลำน้ำ');
    this.layerControl.addOverlay(village.addTo(this.map), 'หมู่บ้าน');
    this.layerControl.addOverlay(rainSta.addTo(this.map), 'ตำแหน่งวัดปริมาณน้ำฝนเพื่อนพึ่งภาฯ');
    this.layerControl.addOverlay(strmSta.addTo(this.map), 'ตำแหน่งเครื่องติดตามข้อมูลน้ำ');

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
              `สถานี:${feature.properties.stacode} ${feature.properties.place}`, {
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

    // get runoff
    this.service.getRunoff(530001).then((res: any) => {
      if (res.data[0] != null) {
        this.station01Runoff = res.data[0].flow_level;
      } else {
        this.station01Runoff = 0;
      }
    })

    this.service.getRunoff(530002).then((res: any) => {
      if (res.data[0] != null) {
        this.station02Runoff = res.data[0].flow_level;
      } else {
        this.station02Runoff = 0;
      }

    })

    this.service.getRunoff(530003).then((res: any) => {
      if (res.data[0] != 0) {
        this.station03Runoff = res.data[0].flow_level;
      } else {
        this.station03Runoff = 0;
      }
    })

    this.service.getRunoff(530004).then((res: any) => {
      if (res.data[0] != 0) {
        this.station04Runoff = res.data[0].flow_level;
      } else {
        this.station04Runoff = 0;
      }
    })

    this.service.getRunoff(530005).then((res: any) => {
      if (res.data[0] != 0) {
        this.station05Runoff = res.data[0].flow_level;
      } else {
        this.station05Runoff = 0;
      }
    })


    // get rain
    this.service.getRain(530001).then((res: any) => {
      if (res.weather[0] != null) {
        this.station01Rain = res.weather[0].microclimate[0].data.rain;
        this.floodSim01()
      } else {
        this.station01Rain = 0;
      }
    })

    this.service.getRain(530002).then((res: any) => {
      // console.log(res)
      if (res.weather[0] != null) {
        this.station02Rain = res.weather[0].microclimate[0].data.rain;
        this.floodSim02()
      } else {
        this.station02Rain = 0;
      }

    })

    this.service.getRain(530003).then((res: any) => {
      if (res.weather[0] != 0) {
        this.station03Rain = res.weather[0].microclimate[0].data.rain;
        this.floodSim03()
      } else {
        this.station03Rain = 0;
      }
    })

    this.service.getRain(530004).then((res: any) => {
      if (res.weather[0] != 0) {
        this.station04Rain = res.weather[0].microclimate[0].data.rain;
        this.floodSim04()
      } else {
        this.station04Rain = 0;
      }
    })

    this.service.getRain(530005).then((res: any) => {
      if (res.weather[0] != 0) {
        this.station05Rain = res.weather[0].microclimate[0].data.rain;
        this.floodSim05()
      } else {
        this.station05Rain = 0;
      }
    })

  }

  showWeather(e: any) {
    const id = e.sourceTarget.feature.properties.id;
    this.service.getWeather(id).then((res: any) => {
      // console.log(res);
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

  floodSim01() {
    this.map.eachLayer((lyr: any) => {
      if (lyr.name === "lyr_orange01" || lyr.name === "lyr_red01") {
        console.log(lyr);
        this.map.removeLayer(lyr);
        this.layerControl.removeLayer(lyr);
      }
    });
    const rain = Number(this.station01Rain);
    const runoff = Number(this.station01Runoff);
    const lyr_orange = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta01_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_orange '
    });
    const lyr_red = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta01_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_red'
    });

    if (rain > 90 && runoff > 350) {
      this.badge01 = this.iconRed;
      lyr_red.name = 'lyr_red01';
      this.layerControl.addOverlay(lyr_red.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530001');
      this.sendNotify();
    } else if (rain > 90 || runoff > 350) {
      this.badge01 = this.iconOrange;
      lyr_orange.name = 'lyr_orange01';
      this.layerControl.addOverlay(lyr_orange.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530001');
      this.sendNotify();
    } else {
      console.log('green');
      this.badge01 = this.iconGreen;
    }

  }

  floodSim02() {
    this.map.eachLayer((lyr: any) => {
      if (lyr.name === "lyr_orange02" || lyr.name === "lyr_red02") {
        console.log(lyr);
        this.map.removeLayer(lyr);
        this.layerControl.removeLayer(lyr);
      }
    });
    const rain = Number(this.station02Rain);
    const runoff = Number(this.station02Runoff);
    const lyr_orange = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta02_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_orange'
    });
    const lyr_red = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta02_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_red'
    });

    if (rain > 90 && runoff > 420) {
      this.badge02 = this.iconRed;
      lyr_red.name = 'lyr_red02';
      this.layerControl.addOverlay(lyr_red.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530002');
      this.sendNotify();
    } else if (rain > 90 || runoff > 420) {
      this.badge02 = this.iconOrange;
      lyr_orange.name = 'lyr_orange02';
      this.layerControl.addOverlay(lyr_orange.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530002');
      this.sendNotify();
    } else {
      this.badge02 = this.iconGreen;
      console.log('green');
    }

  }

  floodSim03() {
    this.map.eachLayer((lyr: any) => {
      if (lyr.name === "lyr_orange03" || lyr.name === "lyr_red03") {
        console.log(lyr);
        this.map.removeLayer(lyr);
        this.layerControl.removeLayer(lyr);
      }
    });
    const rain = Number(this.station03Rain);
    const runoff = Number(this.station03Runoff);
    const lyr_orange = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta03_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_orange '
    });
    const lyr_red = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta03_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_red'
    });

    if (rain > 90 && runoff > 150) {
      this.badge03 = this.iconRed;
      lyr_red.name = 'lyr_red03';
      this.layerControl.addOverlay(lyr_red.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530003');
      this.sendNotify();
    } else if (rain > 90 || runoff > 150) {
      this.badge03 = this.iconOrange;
      lyr_orange.name = 'lyr_orange03';
      this.layerControl.addOverlay(lyr_orange.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530003');
      this.sendNotify();
    } else {
      this.badge03 = this.iconGreen;
      console.log('green')
    }

  }

  floodSim04() {
    this.map.eachLayer((lyr: any) => {
      if (lyr.name === "lyr_orange04" || lyr.name === "lyr_red04") {
        console.log(lyr);
        this.map.removeLayer(lyr);
        this.layerControl.removeLayer(lyr);
      }
    });
    const rain = Number(this.station04Rain);
    const runoff = Number(this.station04Runoff);

    const lyr_orange = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta04_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_orange '
    });
    const lyr_red = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta04_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_red'
    });

    if (rain > 90 && runoff > 150) {
      this.badge04 = this.iconRed;
      lyr_red.name = 'lyr_red04';
      this.layerControl.addOverlay(lyr_red.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530004');
      this.sendNotify();
    } else if (rain > 90 || runoff > 150) {
      this.badge04 = this.iconOrange;
      lyr_orange.name = 'lyr_orange04';
      this.layerControl.addOverlay(lyr_orange.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530004');
      this.sendNotify();
    } else {
      this.badge04 = this.iconGreen;
      console.log('green')
    }

  }

  floodSim05() {
    this.map.eachLayer((lyr: any) => {
      if (lyr.name === "lyr_orange05" || lyr.name === "lyr_red05") {
        console.log(lyr);
        this.map.removeLayer(lyr);
        this.layerControl.removeLayer(lyr);
      }
    });
    const rain = Number(this.station05Rain);
    const runoff = Number(this.station05Runoff);

    const lyr_orange = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta01_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_orange '
    });
    const lyr_red = L.tileLayer.wms("http://www.cgi.uru.ac.th/geoserver/ows?", {
      layers: 'ud:ll_floodarea_sta05_4326',
      format: 'image/png',
      transparent: true,
      styles: 'flood_red'
    });

    if (rain > 90 && runoff > 300) {
      this.badge05 = this.iconRed;
      lyr_red.name = 'lyr_red05';
      this.layerControl.addOverlay(lyr_red.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530005');
      this.sendNotify();
    } else if (rain > 90 || runoff > 300) {
      this.badge05 = this.iconOrange;
      lyr_orange.name = 'lyr_orange05';
      this.layerControl.addOverlay(lyr_orange.addTo(this.map), 'พื้นที่เสี่ยงน้ำท่วม 530005');
      this.sendNotify();
    } else {
      this.badge05 = this.iconGreen;
      console.log('green')
    }

  }

  sendNotify() {
    this.service.sendNotify().then((res) => {
      console.log(res)
    })
  }


}

export class Station {
  rain: number;
  runoff: number;
}