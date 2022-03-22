import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class HomeComponent implements OnInit {
  messages: any;

  constructor() { }

  public selectChatIndex = 0;
  channels: any[] = [
    {
      name: 'Tcs Exam 26th-Feb',
      messages:[],
      updated: new Date('1/1/16'),
    },
    {
      name: 'Infy TQ 5th-Mar',
      messages:[],
      updated: new Date('1/1/16'),
    },
    {
      name: 'Accolite 13th-Mar',
      messages:[],
      updated: new Date('1/1/16'),
    },
  ];

  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  ngOnInit(): void {
  }

  selectedChat(chat:any, index:any)
  {
    console.log(`Chat::: `, chat, index);
    this.selectChatIndex = index;
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
