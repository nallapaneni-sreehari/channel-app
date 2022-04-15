import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/shared/services/global/global-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JoinServerComponent } from '../join-server/join-server.component';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.css']
})
export class CreateServerComponent implements OnInit {

  constructor(private http: HttpClient, 
    private service: GlobalDataService,
    private dialog: MatDialog
    ) { }


  // TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyZWVoYXJpQGdtYWlsLmNvbSIsIl9pZCI6IjYyM2FmMGUxMWVmNDQzM2UwYzZlYTZjOCIsImlhdCI6MTY0ODAzNDQ4Nn0.s37WIL5PsW_s-yyH3H9zach3MnY758puWKVah7zoORI";


  serverType:any='';
  serverProfile: any='';
  ngOnInit(): void {
  }


  createServer(form:any)
  {
    let params = form.value;
    const formData = new FormData();

    formData.append('profile', this.serverProfile, 'serverProfile');

    formData.append('currentUser', this.service.currentUser);

    formData.append('creatorId', this.service.userId);


    for(var key of Object.keys(params))
    {
      formData.append(key, params[key]);
    }

    var headers_object = new HttpHeaders().set("x-api-token", this.service.userToken);

    this.http.post('http://localhost:2000/v1/server/data/add',formData, {headers:headers_object}).subscribe(data=>{
      console.log(`Uploaded :: `, data);
    });

  }

  onProfileUpload(file:any)
  {
    this.serverProfile = file[0];
    console.log(file);
  }

  joinServerDialog(): void {
    const dialogRef = this.dialog.open(JoinServerComponent, {
      width: '750px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result, "this.channelDetails:: ",result);
    });
  }
}
