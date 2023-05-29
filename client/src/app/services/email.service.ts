import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  sendEmail(recipient: string, subject: string, content:string): Promise <any> {
    const emailData =  {recipient, subject, content};
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    const serverUrl = 'http://localhost:3000'

    return new Promise((resolve, reject) => {
      this.http.post(`${serverUrl}/sendEmail`, emailData, {headers, responseType: 'text'})
      .subscribe(
        response => {
          console.log('able to hit node endpojnt', response)
          resolve(response);
        },
        error => {
          console.log('from server unable to hit node endpoint')
          reject(error);
        }
      )
    }) 
  }
}
