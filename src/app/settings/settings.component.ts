import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface PeriodicElement {
  user_name: string;
  user_email: string;
  manager: string;
  status: string;
  avatar: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { user_name: 'Alek Paskewitz',
    user_email:'alekp@opin.com', 
    manager: 'Chris Zaugg', 
    status: 'Active',
    avatar: 'https://ca.slack-edge.com/T3LNK4A3Y-U9931H728-e02f70761acb-48',
  },
  { user_name: 'Britta Probert',
    user_email:'brittapp@uptickapp.com', 
    manager: 'Michael Probert', 
    status: 'Active',
    avatar: 'https://ca.slack-edge.com/T3LNK4A3Y-UHSPG0865-07dd88cc8978-48',
  },
  { user_name: 'Chris Zaugg',
    user_email:'chrisz@uptickapp.com', 
    manager: 'Ray Pinson', 
    status: 'Active',
    avatar: 'https://ca.slack-edge.com/T3LNK4A3Y-U3L13RR0T-aea59c458eca-48',
  },
  { user_name: 'Stella Cat',
    user_email: 'stella@uptick.om', 
    manager: 'Michael Probert', 
    status: 'Invited',
    avatar: '',
  }
];


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  displayedColumns: string[] = ['user', 'status', 'manager', 'actions'];
  dataSource = ELEMENT_DATA;

    constructor(public dialog: MatDialog) {}

  public edit = false;

  ngOnInit(): void {
  }
openDialog(): void {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
export class UserDialog {

  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
