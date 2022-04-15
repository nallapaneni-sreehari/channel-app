import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/shared/services/global/global-data.service';
import { CreateChannelComponent, DialogData } from './create-channel/create-channel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CHANNELR';
  public isAuthenticated = true;
  
  public channelDetails = {};
  channelName: string="";
  channelSize: Number=0;
  channelType: string="";
  isPaidChannel: boolean=false;
  channelEntryFee: string=""

  constructor
  (
    public dialog: MatDialog, 
    public global: GlobalDataService,
    private router: Router
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '450px',
      height: '340px',
      data: {
        channelName: this.channelName, 
        channelSize: this.channelSize,
        channelType: this.channelType,
        isPaidChannel: this.isPaidChannel,
        channelEntryFee: this.channelEntryFee

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.channelDetails = result;
      console.log('The dialog was closed', result, "this.channelDetails:: ",this.channelDetails);
    });
  }

  public logout(): void 
  {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

    this.global.loginVerified = false;

    this.global.userToken = '';

    this.global.currentUser = '';

    this.global.name = '';

  }

}
