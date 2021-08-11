import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  header:any = {
    headers: new HttpHeaders()
      .set('Authorization',  localStorage.getItem('authkey'))
  };
  constructor(private http: HttpClient) {}

  getUsersList() {
    return this.http.get(environment.APIURL + "user/getAllUser",this.header);
  }

  toggleUserStatus(id) {
    return this.http.get(environment.APIURL + "user/toggleUser/" + id,this.header);
  }

  userListService(type){
    return this.http.get(environment.APIURL + "user/getAllMemberType/"+ type,this.header);
  }

  categoryListService(){
    return this.http.get(environment.APIURL + "category/fetch",this.header);
  }

  addCategory(data){
    return this.http.post(environment.APIURL + "category/add", data,this.header);
  }

  removeCategory(data){
    return this.http.post(environment.APIURL + "category/remove", data,this.header);
  }

  editUser(data,id){
    return this.http.put(environment.APIURL + "user/updateUser/"+id, data,this.header);
  }
}
