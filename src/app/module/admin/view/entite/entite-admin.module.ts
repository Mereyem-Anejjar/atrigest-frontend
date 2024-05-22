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

import { TypeEntiteExterneCreateAdminComponent } from './type-entite-externe/create/type-entite-externe-create-admin.component';
import { TypeEntiteExterneEditAdminComponent } from './type-entite-externe/edit/type-entite-externe-edit-admin.component';
import { TypeEntiteExterneViewAdminComponent } from './type-entite-externe/view/type-entite-externe-view-admin.component';
import { TypeEntiteExterneListAdminComponent } from './type-entite-externe/list/type-entite-externe-list-admin.component';
import { EntiteExterneCreateAdminComponent } from './entite-externe/create/entite-externe-create-admin.component';
import { EntiteExterneEditAdminComponent } from './entite-externe/edit/entite-externe-edit-admin.component';
import { EntiteExterneViewAdminComponent } from './entite-externe/view/entite-externe-view-admin.component';
import { EntiteExterneListAdminComponent } from './entite-externe/list/entite-externe-list-admin.component';

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

    TypeEntiteExterneCreateAdminComponent,
    TypeEntiteExterneListAdminComponent,
    TypeEntiteExterneViewAdminComponent,
    TypeEntiteExterneEditAdminComponent,
    EntiteExterneCreateAdminComponent,
    EntiteExterneListAdminComponent,
    EntiteExterneViewAdminComponent,
    EntiteExterneEditAdminComponent,
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
  TypeEntiteExterneCreateAdminComponent,
  TypeEntiteExterneListAdminComponent,
  TypeEntiteExterneViewAdminComponent,
  TypeEntiteExterneEditAdminComponent,
  EntiteExterneCreateAdminComponent,
  EntiteExterneListAdminComponent,
  EntiteExterneViewAdminComponent,
  EntiteExterneEditAdminComponent,
  ],
})
export class EntiteAdminModule { }
