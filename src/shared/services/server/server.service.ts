import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalDataService } from '../global/global-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public URL = 'http://localhost:2000/v1/server/data/';

  constructor(private http: HttpClient, private service: GlobalDataService) { }

  public storedItem:any = localStorage.getItem('user');

  public user = JSON.parse(this.storedItem);

  

  getUserServersAndChannels()
  {
    console.log(`User ::: `, this.service);
    var headers = new HttpHeaders().set("x-api-token", this.service.userToken);
    
    return this.http.post(this.URL+"getServersAndChannels",{userId:this.service.userId, currentUser: this.service.currentUser}, {headers:headers});
  }

  searchServer(searchString:String, skip:Number)
  {
    return this.http.post(this.URL+"searchServer",{searchString:searchString, skip:skip, userId:this.service.userId});
  }
}
