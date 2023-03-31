import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
url: string = "https://api.openweathermap.org/data/2.5/weather?&appid=";
  key: string ="397deb163cbab8dfd6bbf6c1a7d66274";

  constructor(private http: HttpClient) { }

  getWeatherApi(city:string): Observable<any>{
    const urlCity: string = this.url+this.key+'&q=' + city + '&units=metric'
    return this.http.get(urlCity)
  }
  
}
