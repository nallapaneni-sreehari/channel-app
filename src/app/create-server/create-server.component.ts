import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.css']
})
export class CreateServerComponent implements OnInit {

  constructor(private http: HttpClient) { }


  TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyZWVoYXJpQGdtYWlsLmNvbSIsIl9pZCI6IjYyM2FmMGUxMWVmNDQzM2UwYzZlYTZjOCIsImlhdCI6MTY0ODAzNDQ4Nn0.s37WIL5PsW_s-yyH3H9zach3MnY758puWKVah7zoORI";


  serverType:any='';
  serverProfile: any='';
  ngOnInit(): void {
  }


  createServer(form:any)
  {
    let params = form.value;
    const formData = new FormData();

    formData.append('profile', this.serverProfile, 'serverProfile');

    formData.append('currentUser', "sreehari@gmail.com");

    formData.append('creatorId', "1149");


    for(var key of Object.keys(params))
    {
      formData.append(key, params[key]);
    }

    var headers_object = new HttpHeaders().set("x-api-token", this.TOKEN);

    this.http.post('http://localhost:2000/v1/server/data/add',formData, {headers:headers_object}).subscribe(data=>{
      console.log(`Uploaded :: `, data);
    });

  }

  onProfileUpload(file:any)
  {
    this.serverProfile = file[0];
    console.log(file);
  }

}
