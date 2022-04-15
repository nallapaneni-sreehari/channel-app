import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { message } from 'src/shared/interfaces/message';
import { ChannelService } from 'src/shared/services/channel/channel.service';
import { GlobalDataService } from 'src/shared/services/global/global-data.service';
import { ServerService } from 'src/shared/services/server/server.service';
import { UserService } from 'src/shared/services/user/user.service';
import { JoinServerComponent } from '../join-server/join-server.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  message: any = {
    from: '',
    channel: '',
    senderEmail: '',
    senderId: '',
    text: '',
    sentAt: '',
    msgStatus: ''
  };

  messages :any = [
  ];

  constructor(
    private toastEvokeService: ToastEvokeService, 
    private serverService: ServerService, 
    public service: GlobalDataService, private router: Router,
    private userService: UserService,
    private channelService: ChannelService,
    private dialog: MatDialog

    ) 
    { 
      userService.onSent().subscribe(data=>{
        this.messages.push(data);
      })
    }

  public selectedServerIndex = 0;

  public serverType:String='';

  public selectChannelIndex = 0;

  public currentChat: any = '';

  public currentChannel: any = [];

  public currentChatChannels: any= '';

  public loginToastSubscription:any = '';

  public currentServer:any = '';

  public serversAndChannelsUserIn:any = [];


  // servers:any = [
  //   {
  //     id:"s001",
  //     name:"Iron Man Fan Club",
  //     profile:"../../assets/img/ironman.jpg",
  //     channels:[
  //       {
  //         cId:"r1511",
  //         cName:"Iron Man in 2012"
  //       },
  //       {
  //         cId:"r15101",
  //         cName:"Iron Man in 2014"
  //       }
  //       ,
  //       {
  //         cId:"r15102",
  //         cName:"Iron Man in 2019"
  //       }
  //     ]
  //   },
  //   {
  //     id:"s002",
  //     name:"Captain America Fan Club",
  //     profile:"../../assets/img/captain.jpg",
  //     channels:[
  //       {
  //         cId:"r1512",
  //         cName:"Captain in 1969"
  //       },
  //       {
  //         cId:"r151201",
  //         cName:"Captain in 2001"
  //       },
  //       {
  //         cId:"r151202",
  //         cName:"Captain in 2019"
  //       }
  //     ]
  //   },
  //   {
  //     id:"s003",
  //     name:"Bat Man Fan Club",
  //     profile:"../../assets/img/batman.jpg",
  //     channels:[
  //       {
  //         cId:"r1513",
  //         cName:"BatMan in 2021"
  //       }
  //     ]
  //   }
  // ]

  servers:any = [];

  async ngOnInit(): Promise<void> {

    console.log(`service :::: `, this.service.profile);
    
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(`User ::: `, user, user?.userToken);

    if (Object.keys(user)?.length > 0) {
      if (!(user?.userToken || user?.currentUser || user?.loginVerified)) {
        this.router.navigate(['/login']);
      }
    }
    else
    {
      this.router.navigate(['/login']);
    }

    this.getAllServersAndChannels();

    console.log(`servers ::: `, this.servers, "Messages :::", this.messages); 
  }

  selectedServer(chat:any, index:any, type:any)
  {
    this.serverType = type;
    console.log(`Chat::: `, chat, index,this.selectedServerIndex, type);
    this.currentChat = chat;
    this.currentChannel = chat?.channels[0];
    this.currentChatChannels = chat?.channels;
    this.selectedServerIndex = index;
  }

  selectChannel(chat:any, index:any)
  {
    console.log(`selectChannel ::: `, chat, index);
    this.currentChannel = chat;
    this.selectChannelIndex = index;
    this.getMessages(chat);

  }

  getAllServersAndChannels()
  {
    this.serverService.getUserServersAndChannels().subscribe((data:any)=>{
      console.log(`Servers And Channels :: `, data);
      
      if(data && Object.keys(data).includes('data'))
      {
        this.servers = data?.data;
        this.serverType = 'created';
        console.log(`data?.length :: `, this.servers?.length);

        this.currentServer = this.servers[0];
        this.currentChatChannels = this.servers[0]?.channels ? this.servers[0]?.channels : [];
        this.currentChannel = this.currentChatChannels[0] ? this.currentChatChannels[0] : [];
        this.currentChat = this.servers[0];

        this.getMessages(this.currentChannel);
        
      }
      
      this.userService.getServersAndChannelsUserIn().subscribe((data:any)=>{
        console.log(`getServersAndChannelsUserIn ::: `, data);
    
        if(data && data?.data)
        {
          this.serversAndChannelsUserIn = data.data;
        }
        if(!(this.servers.length > 0))
        {
          console.log(`Joined ...`);
          
          this.serverType = 'joined';
    
          this.currentServer = this.serversAndChannelsUserIn[0];
          this.currentChatChannels = this.serversAndChannelsUserIn[0]?.channels ? this.serversAndChannelsUserIn[0]?.channels : [];
          this.currentChannel = this.currentChatChannels[0] ? this.currentChatChannels[0] : [];
          this.currentChat = this.serversAndChannelsUserIn[0];

          this.getMessages(this.currentChannel);

        }
      },
      err=>console.log(`Err::: `, err)
      );
    },
    err=>{
      console.log(`Error fetching servers and channels ::`, err);
      
    }
    );

    return this.servers;
  }


sendMessage()
{
  this.message.channel = this.currentChannel._id;
  this.message.senderEmail = this.service.currentUser;
  this.message.from = this.service.name;
  this.message.senderId = this.service.userId;

  console.log(`Message ::: `, this.message);
  
  this.userService.sendMessage(this.message);
}


getMessages(chat:any)
{
  this.channelService.getAllMessages(chat._id).subscribe((data:any)=>{
      
    this.messages = data?.data;
    console.log("Messages :::", this.messages);
  });
}

getServersAndChannelsUserIn()
{
  this.userService.getServersAndChannelsUserIn().subscribe((data:any)=>{
    console.log(`getServersAndChannelsUserIn ::: `, data);

    if(data && data?.data)
    {
      this.serversAndChannelsUserIn = data.data;
    }
    
  },
  err=>console.log(`Err::: `, err));
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

  ngOnDestroy(): void 
  {
    
  }
}
