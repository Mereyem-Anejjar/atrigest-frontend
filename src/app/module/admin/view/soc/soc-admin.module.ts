import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from "primeng/editor";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";

import { SocieteCreateAdminComponent } from './societe/create/societe-create-admin.component';
import { SocieteEditAdminComponent } from './societe/edit/societe-edit-admin.component';
import { SocieteViewAdminComponent } from './societe/view/societe-view-admin.component';
import { SocieteListAdminComponent } from './societe/list/societe-list-admin.component';
import { RoleAssocieCreateAdminComponent } from './role-associe/create/role-associe-create-admin.component';
import { RoleAssocieEditAdminComponent } from './role-associe/edit/role-associe-edit-admin.component';
import { RoleAssocieViewAdminComponent } from './role-associe/view/role-associe-view-admin.component';
import { RoleAssocieListAdminComponent } from './role-associe/list/role-associe-list-admin.component';
import { AssocieCreateAdminComponent } from './associe/create/associe-create-admin.component';
import { AssocieEditAdminComponent } from './associe/edit/associe-edit-admin.component';
import { AssocieViewAdminComponent } from './associe/view/associe-view-admin.component';
import { AssocieListAdminComponent } from './associe/list/associe-list-admin.component';
import { TypeSocieteCreateAdminComponent } from './type-societe/create/type-societe-create-admin.component';
import { TypeSocieteEditAdminComponent } from './type-societe/edit/type-societe-edit-admin.component';
import { TypeSocieteViewAdminComponent } from './type-societe/view/type-societe-view-admin.component';
import { TypeSocieteListAdminComponent } from './type-societe/list/type-societe-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [

    SocieteCreateAdminComponent,
    SocieteListAdminComponent,
    SocieteViewAdminComponent,
    SocieteEditAdminComponent,
    RoleAssocieCreateAdminComponent,
    RoleAssocieListAdminComponent,
    RoleAssocieViewAdminComponent,
    RoleAssocieEditAdminComponent,
    AssocieCreateAdminComponent,
    AssocieListAdminComponent,
    AssocieViewAdminComponent,
    AssocieEditAdminComponent,
    TypeSocieteCreateAdminComponent,
    TypeSocieteListAdminComponent,
    TypeSocieteViewAdminComponent,
    TypeSocieteEditAdminComponent,
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
    PaginatorModule,
    TranslateModule,
    FileUploadModule,
    FullCalendarModule,
    CardModule,
    EditorModule,


  ],
  exports: [
  SocieteCreateAdminComponent,
  SocieteListAdminComponent,
  SocieteViewAdminComponent,
  SocieteEditAdminComponent,
  RoleAssocieCreateAdminComponent,
  RoleAssocieListAdminComponent,
  RoleAssocieViewAdminComponent,
  RoleAssocieEditAdminComponent,
  AssocieCreateAdminComponent,
  AssocieListAdminComponent,
  AssocieViewAdminComponent,
  AssocieEditAdminComponent,
  TypeSocieteCreateAdminComponent,
  TypeSocieteListAdminComponent,
  TypeSocieteViewAdminComponent,
  TypeSocieteEditAdminComponent,
  ],
})
export class SocAdminModule { }
