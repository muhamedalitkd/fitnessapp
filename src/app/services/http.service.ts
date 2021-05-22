import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  // post(serviceName: string, data: any) {
  //   const headers = new HttpHeaders();
  //   const options = { header: headers, withCredentials: false};

  //   const url = environment.apiUrl + serviceName;

  //   return this.http.post(url, JSON.stringify(data), options);
  // }
}
