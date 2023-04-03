import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { WeatherApiService } from 'src/app/service/weather-api.service';
import {  Observable, of, throwError } from 'rxjs'
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let  weatherApiService : jasmine.SpyObj<WeatherApiService>;
  let mockDo : jasmine.SpyObj<DashboardComponent>;
  let el: DebugElement;
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

  beforeEach(async () => {
    weatherApiService = jasmine.createSpyObj('WeatherApiService', ['getWeatherApi']);
    mockDo  =  jasmine.createSpyObj('DashboardComponent', ['clearEverything']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        FormsModule], 
      declarations: [ DashboardComponent ],
      providers: [
        { provide: WeatherApiService, useValue: weatherApiService }
     ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(DashboardComponent);
    el = fixture.debugElement;
    fixture.detectChanges();
     mockDo =  jasmine.createSpyObj('DashboardComponent', ['clearEverything']);
  });

  it('debe de existir dashboardComponent', () => {
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });

  it('should call WeatherApiService.getWeatherApi', fakeAsync (() => {
   
    const input = el.query(By.css('input')).nativeElement;
      input.value = 'cancun';
      weatherApiService.getWeatherApi.and.returnValue(of(responseGetCityWeather));
  
    const button = el.query(By.css('.sendData'));
    button.triggerEventHandler('click', null)
    
    tick();
    fixture.detectChanges();
    expect(weatherApiService.getWeatherApi).toHaveBeenCalledTimes(1);
    

    
  }));

  it('should call Swal of Sweet alert when de calling to http didnt work ',  ((done) => {
    const input = el.query(By.css('input')).nativeElement;
      input.value = 'dfgdfdsfdf';
      const swal = spyOn(Swal, "fire")
     weatherApiService.getWeatherApi.and.callThrough().and.returnValue(throwError(() => new HttpErrorResponse({ error: "HttpErrorResponse", status:404, statusText:"Not Found" })));
    const button = el.query(By.css('.sendData'));
    button.triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(swal).toHaveBeenCalledTimes(1)
done();
    
  }));
 

  





  
});


