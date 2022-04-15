import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from 'src/shared/services/server/server.service';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'app-join-server',
  templateUrl: './join-server.component.html',
  styleUrls: ['./join-server.component.css']
})
export class JoinServerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<JoinServerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serverService: ServerService,
    public userService: UserService
  ) { }

  public searchServerString:String='';
  public serversList:any=[];
  public serversCount=0;

  public page = 1;
  public pageSize = 5;
  
  public joiningServer = false;

  ngOnInit(): void {
    this.searchServer('');
  }

  searchServer(key:any)
  {
    this.searchServerString = key;

    console.log(`Key ::: `, key, " currentPage :: ", this.page);

    var skip = (this.page - 1) * this.pageSize;

    console.log(`skip ::: `, skip);
    
    this.serverService.searchServer(key, skip).subscribe((data:any)=>{
      console.log(`Search Result ::: `,data.data.response, data.data.count);
      if(data && data?.data?.response)
      {
        this.serversList = data.data.response;
        this.serversCount = data.data.count;

        if(this.serversCount < 5)
        {
          this.page = 1;
        }
      }
    },
    err=>
    {
      console.log(`Error server search :: `, err)
    });
  }

  joinServer(server:any)
  {
    console.log(`Server Id ::: `, server, server._id);
    
    this.joiningServer = true;
    this.userService.joinUserToServer(server._id).subscribe((data:any)=>{
      console.log(`Status ::: `, data);

      if(data && data.data && data.data[0]?.status)
      {
        console.log(`Joined server !`);
      }
      this.joiningServer = false;
    },
    err=>{
      console.log(`Err join server :: `, err);
      this.joiningServer = false;
    });
  }
}
