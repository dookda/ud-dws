import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public url = 'http://cgi.uru.ac.th:3000';

  constructor(
    public http: HttpClient
  ) { }

  getWeather(id: any) {
    const json = 'http://54.148.113.189/linephp/weather-intent/tmdweather.php?station=' + id;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(json).subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  getAirquality() {
    const json = 'http://cgi.uru.ac.th:3000/aqi/aqi';
    return new Promise((resolve: any, reject: any) => {
      this.http.get(json).subscribe((res: any) => {
        resolve(res.data.stations);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  getViirs() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(this.url + '/hp/hp_viirs').subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  getModis() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(this.url + '/hp/hp_modis').subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  getRadars() {
    const imageUrl = `http://apirain.tvis.in.th/output.json`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(imageUrl).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  getCheckpoint() {
    const url = `http://cgi.uru.ac.th/geoserver/ud/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ud%3All_station_4326&outputFormat=application%2Fjson`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  getMeteoService(staId: any) {
    const url = `http://cgi.uru.ac.th:3000/weather/weather2/${staId}`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  getRunoff(staId: any) {
    const url = `http://cgi.uru.ac.th:3000/dws/waterlev/${staId}`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }
  getRain(staId: any) {
    const url = `http://54.148.113.189/linephp/weather-intent/tmdweather.php?station=${staId}`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  sendNotify() {
    const url = `http://cgi.uru.ac.th:3000/aqi/sendnotify`;
    return new Promise((resolve: any, reject: any) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }
}
