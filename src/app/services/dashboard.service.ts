import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  header:any = {
    headers: new HttpHeaders()
      .set('Authorization',  localStorage.getItem('authkey'))
  };
  constructor(private http: HttpClient) { }

  getDashboardCounts() {
    return this.http.get(environment.APIURL + "data/dashboard",this.header);
  }

  getchatRoom(){
    return this.http.get(environment.APIURL + "chat/getRooms",this.header);
  }

  getchatsbyRoom(chatroom){
    return this.http.get(environment.APIURL + "chat/getChat/"+chatroom,this.header);
  }

  addChats(chatdetails){
    let bodydata={
      "roomId":chatdetails.roomId,
      "message":chatdetails.message
    }
    return this.http.post(environment.APIURL + "chat/addChat/",bodydata,this.header);
  }

}
