import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalDataService } from '../global/global-data.service';
import { io } from 'socket.io-client';
import {message} from '../../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL = 'http://localhost:2000/v1/user/data/';

  public socket = io('http://localhost:2000');
    
  constructor(private http: HttpClient, private service: GlobalDataService) { }


  register(user:any): Observable<any>
  {
    return this.http.post(this.URL+"register", {...user});
  }

  login(user:any): Observable<any>
  {
    return this.http.post(this.URL+"login", user);
  }

  sendMessage(message:any)
  {
    this.socket.emit('message',message);
  
  }

  
onSent()
{
  let observable = new Observable<message>(observer=>{
    this.socket.on('message-sent',message=>{
      console.log(`Msg ::: `, message);
      observer.next(message);
    });
    return () => {this.socket.disconnect();}
  });

  return observable;
}

getServersAndChannelsUserIn()
{
  var headers = new HttpHeaders().set("x-api-token", this.service.userToken);
    
  return this.http.post(this.URL+"getServersAndChannelsUserIn",{userId:this.service.userId, currentUser: this.service.currentUser}, {headers:headers});
}

joinUserToServer(serverId:any)
{
  var headers = new HttpHeaders().set("x-api-token", this.service.userToken);

  return this.http.post(this.URL+"joinUserToServer",{userId:this.service.userId, currentUser: this.service.currentUser, serverId:serverId}, {headers:headers});
}

}
