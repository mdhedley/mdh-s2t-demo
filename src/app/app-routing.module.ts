import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { UploadComponent } from './upload/upload.component'
import { LoginComponent } from './login/login.component'
import { DetailFileComponent } from './detail-file/detail-file.component' 
import { AuthGuardService } from './services/auth-guard.service'


const routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'detail/:id', component: DetailFileComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}