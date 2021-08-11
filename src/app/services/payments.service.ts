import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  header:any = {
    headers: new HttpHeaders()
      .set('Authorization',  localStorage.getItem('authkey'))
  };
  constructor(private http: HttpClient) {}

  getPaymentsList() {
    return this.http.get(environment.APIURL + "getAllPayments",this.header);
  }

}
