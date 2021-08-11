import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  header:any = {
    headers: new HttpHeaders()
      .set('Authorization',  localStorage.getItem('authkey'))
  };
  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get(environment.APIURL + 'post/getAllSocialPost',this.header);
  }

  editSocialPost(data,id){
    return this.http.put(environment.APIURL + "socialPost/updateSocialPost/"+id, data,this.header);
  }

  categoryListService(){
    return this.http.get(environment.APIURL + "category/fetch",this.header);
  }
}
