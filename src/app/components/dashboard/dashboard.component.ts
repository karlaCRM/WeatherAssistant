import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/service/weather-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  urlImage: string = "https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-2.png"
  city: string = ""
  temperature: number = 0;
  humidity: number = 0;
  weather: string = "";
  query: boolean= false;
  loading: boolean = false;
  feels_like: number = 0;
  temperature_max:number = 0;
  temperature_min: number =0;


constructor(private _weatherService:WeatherApiService ){}

ngOnInit(): void {

}
obtainWeather(){
  this.query=false;
  this.loading= true;
  console.log(this.city)
  this._weatherService.getWeatherApi(this.city).subscribe({
    next: data => {
      this.temperature= data.main.temp-273;
      this.humidity = data.main.humidity;
    this.feels_like = data.main.feels_like -273;
    this.temperature_max = data.main.temp_max-273;
    this.temperature_min = data.main.temp_min-273;
    this.weather = `${data.weather[0].main} with ${data.weather[0].description} `
      this.query=true;
      this.loading=false;
      console.log(data)
    },
    error: error =>{
      this.loading=false;
      this.city = "";
      if(error.statusText === 'Not Found'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'city not found!',
        })
      }
    }

  })
}

clearEverything(){
  this.temperature= 0;
  this.humidity = 0;
this.feels_like = 0;
this.temperature_max = 0;
this.temperature_min = 0;
this.weather = "";
  this.query=false;
  this.loading=false;
  this.city="";
}

}
