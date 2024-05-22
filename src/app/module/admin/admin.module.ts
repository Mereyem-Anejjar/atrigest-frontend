import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import { TaskAdminModule } from './view/task/task-admin.module';
import { TaskAdminRoutingModule } from './view/task/task-admin-routing.module';
import { EntiteAdminModule } from './view/entite/entite-admin.module';
import { EntiteAdminRoutingModule } from './view/entite/entite-admin-routing.module';
import { UtilisateurAdminModule } from './view/utilisateur/utilisateur-admin.module';
import { UtilisateurAdminRoutingModule } from './view/utilisateur/utilisateur-admin-routing.module';
import { SocAdminModule } from './view/soc/soc-admin.module';
import { SocAdminRoutingModule } from './view/soc/soc-admin-routing.module';
import { CommunAdminModule } from './view/commun/commun-admin.module';
import { CommunAdminRoutingModule } from './view/commun/commun-admin-routing.module';
import { NotifAdminModule } from './view/notif/notif-admin.module';
import { NotifAdminRoutingModule } from './view/notif/notif-admin-routing.module';
import { DcAdminModule } from './view/dc/dc-admin.module';
import { DcAdminRoutingModule } from './view/dc/dc-admin-routing.module';

import {SecurityModule} from 'src/app/module/security/security.module';
import {SecurityRoutingModule} from 'src/app/module/security/security-routing.module';


@NgModule({
  declarations: [
   LoginAdminComponent,
   RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
  TaskAdminModule,
  TaskAdminRoutingModule,
  EntiteAdminModule,
  EntiteAdminRoutingModule,
  UtilisateurAdminModule,
  UtilisateurAdminRoutingModule,
  SocAdminModule,
  SocAdminRoutingModule,
  CommunAdminModule,
  CommunAdminRoutingModule,
  NotifAdminModule,
  NotifAdminRoutingModule,
  DcAdminModule,
  DcAdminRoutingModule,
  SecurityModule,
  SecurityRoutingModule
  ],
  exports: [
  LoginAdminComponent,
  RegisterAdminComponent,

    TaskAdminModule,
    EntiteAdminModule,
    UtilisateurAdminModule,
    SocAdminModule,
    CommunAdminModule,
    NotifAdminModule,
    DcAdminModule,
  SecurityModule
  ],

})
export class AdminModule { }
