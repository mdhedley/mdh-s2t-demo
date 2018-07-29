import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { DetailFileComponent } from './detail-file/detail-file.component';
import { AngularFireModule } from 'angularfire2'
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFirestore } from 'angularfire2/firestore'

import { AuthService } from './services/auth.service'
import { AuthGuardService } from './services/auth-guard.service'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadComponent,
    LoginComponent,
    DetailFileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService,AuthGuardService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
