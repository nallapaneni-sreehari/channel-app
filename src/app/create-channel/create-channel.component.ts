import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  channelName: string;
  channelSize: Number;
  channelType: string,
  isPaidChannel: boolean,
  channelEntryFee: string
}


@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}


  public channelDetails:any = {
    channelName: '',
    channelSize: '',
    channelType: '',
    isPaidChannel: '',
    channelEntryFee: ''
  };

  ngOnInit(): void {
    this.dialogRef.updateSize('50%', '58%');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form:any)
  {
    console.log(`Channel Form::: `, form.values);
    
  }
}

