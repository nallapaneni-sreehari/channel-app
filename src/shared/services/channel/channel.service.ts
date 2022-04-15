import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  public URL = 'http://localhost:2000/v1/channel/data/'

  constructor(private http:HttpClient) { }

  getAllMessages(channelId:any)
  {
    return this.http.post(this.URL+"getChannelMessages", {channelId:channelId});
  }
}
