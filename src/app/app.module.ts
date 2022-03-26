import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateServerComponent } from './create-server/create-server.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    CreateChannelComponent,
    ProfileComponent,
    CreateServerComponent,
  ],
  imports: [
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot({
      toastCoreConfig:{
        autoCloseDelay: 5000
      }
    }),
    HttpClientModule,
    RouterModule,
    BrowserModule,
    MatRadioModule,
    MatCheckboxModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
