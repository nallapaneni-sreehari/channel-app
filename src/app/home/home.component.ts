import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: any;

  constructor() { }

  public selectChatIndex = 0;

  public selectChannelIndex = 0;

  public currentChat: any = '';

  public currentChannel: any = '';

  public currentChatChannels: any= '';

  servers:any = [
    {
      id:"s001",
      name:"Iron Man Fan Club",
      profile:"../../assets/img/ironman.jpg",
      channels:[
        {
          cId:"r1511",
          cName:"Iron Man in 2012"
        },
        {
          cId:"r15101",
          cName:"Iron Man in 2014"
        }
        ,
        {
          cId:"r15102",
          cName:"Iron Man in 2019"
        }
      ]
    },
    {
      id:"s002",
      name:"Captain America Fan Club",
      profile:"../../assets/img/captain.jpg",
      channels:[
        {
          cId:"r1512",
          cName:"Captain in 1969"
        },
        {
          cId:"r151201",
          cName:"Captain in 2001"
        },
        {
          cId:"r151202",
          cName:"Captain in 2019"
        }
      ]
    },
    {
      id:"s003",
      name:"Bat Man Fan Club",
      profile:"../../assets/img/batman.jpg",
      channels:[
        {
          cId:"r1513",
          cName:"BatMan in 2021"
        }
      ]
    }
  ]


  ngOnInit(): void {
    this.currentChatChannels = this.servers[0]?.channels;
    this.currentChannel = this.currentChatChannels[0];
    this.currentChat = this.servers[0];
  }

  selectedChat(chat:any, index:any)
  {
    console.log(`Chat::: `, chat, index);
    this.currentChat = chat;
    this.currentChannel = chat?.channels[0];
    this.currentChatChannels = chat?.channels;
    this.selectChatIndex = index;
  }

  selectChannel(chat:any, index:any)
  {
    console.log(`selectChannel ::: `, chat, index);
    this.currentChannel = chat;
    this.selectChannelIndex = index;
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file:any) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }
}
