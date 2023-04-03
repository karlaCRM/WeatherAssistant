import { TestBed } from '@angular/core/testing';
import {of} from 'rxjs'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherApiService } from './weather-api.service';


describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpMock : HttpTestingController;
  const responseGetCityWeather = {
    "coord": {
    "lon": -86.8466,
    "lat": 21.1743
    },
    "weather": [
    {
    "id": 801,
    "main": "Clouds",
    "description": "few clouds",
    "icon": "02d"
    }
    ],
    "base": "stations",
    "main": {
    "temp": 28.96,
    "feels_like": 31.12,
    "temp_min": 28.92,
    "temp_max": 28.96,
    "pressure": 1016,
    "humidity": 61
    },
    "visibility": 10000,
    "wind": {
    "speed": 8.75,
    "deg": 130
    },
    "clouds": {
    "all": 20
    },
    "dt": 1680301900,
    "sys": {
    "type": 1,
    "id": 7177,
    "country": "MX",
    "sunrise": 1680262888,
    "sunset": 1680307286
    },
    "timezone": -18000,
    "id": 3531673,
    "name": "Cancún",
    "cod": 200
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherApiService)

  });

  afterEach(() => {
    httpMock.verify();


  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of Parameters from cancun ', () =>{
    service.getWeatherApi("cancun").subscribe({
      next: res =>{
       expect(res).toEqual(responseGetCityWeather)
      }
    })
 const req =  httpMock.expectOne( "https://api.openweathermap.org/data/2.5/weather?&appid=397deb163cbab8dfd6bbf6c1a7d66274&q=cancun&units=metric");

req.flush(responseGetCityWeather)
  })
});
