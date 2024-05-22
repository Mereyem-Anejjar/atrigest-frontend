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

import { TypeIdentiteCreateAdminComponent } from './type-identite/create/type-identite-create-admin.component';
import { TypeIdentiteEditAdminComponent } from './type-identite/edit/type-identite-edit-admin.component';
import { TypeIdentiteViewAdminComponent } from './type-identite/view/type-identite-view-admin.component';
import { TypeIdentiteListAdminComponent } from './type-identite/list/type-identite-list-admin.component';
import { PrioriteCreateAdminComponent } from './priorite/create/priorite-create-admin.component';
import { PrioriteEditAdminComponent } from './priorite/edit/priorite-edit-admin.component';
import { PrioriteViewAdminComponent } from './priorite/view/priorite-view-admin.component';
import { PrioriteListAdminComponent } from './priorite/list/priorite-list-admin.component';
import { BanqueCreateAdminComponent } from './banque/create/banque-create-admin.component';
import { BanqueEditAdminComponent } from './banque/edit/banque-edit-admin.component';
import { BanqueViewAdminComponent } from './banque/view/banque-view-admin.component';
import { BanqueListAdminComponent } from './banque/list/banque-list-admin.component';
import { EtatAvancementCreateAdminComponent } from './etat-avancement/create/etat-avancement-create-admin.component';
import { EtatAvancementEditAdminComponent } from './etat-avancement/edit/etat-avancement-edit-admin.component';
import { EtatAvancementViewAdminComponent } from './etat-avancement/view/etat-avancement-view-admin.component';
import { EtatAvancementListAdminComponent } from './etat-avancement/list/etat-avancement-list-admin.component';
import { NationaliteCreateAdminComponent } from './nationalite/create/nationalite-create-admin.component';
import { NationaliteEditAdminComponent } from './nationalite/edit/nationalite-edit-admin.component';
import { NationaliteViewAdminComponent } from './nationalite/view/nationalite-view-admin.component';
import { NationaliteListAdminComponent } from './nationalite/list/nationalite-list-admin.component';

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

    TypeIdentiteCreateAdminComponent,
    TypeIdentiteListAdminComponent,
    TypeIdentiteViewAdminComponent,
    TypeIdentiteEditAdminComponent,
    PrioriteCreateAdminComponent,
    PrioriteListAdminComponent,
    PrioriteViewAdminComponent,
    PrioriteEditAdminComponent,
    BanqueCreateAdminComponent,
    BanqueListAdminComponent,
    BanqueViewAdminComponent,
    BanqueEditAdminComponent,
    EtatAvancementCreateAdminComponent,
    EtatAvancementListAdminComponent,
    EtatAvancementViewAdminComponent,
    EtatAvancementEditAdminComponent,
    NationaliteCreateAdminComponent,
    NationaliteListAdminComponent,
    NationaliteViewAdminComponent,
    NationaliteEditAdminComponent,
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
  TypeIdentiteCreateAdminComponent,
  TypeIdentiteListAdminComponent,
  TypeIdentiteViewAdminComponent,
  TypeIdentiteEditAdminComponent,
  PrioriteCreateAdminComponent,
  PrioriteListAdminComponent,
  PrioriteViewAdminComponent,
  PrioriteEditAdminComponent,
  BanqueCreateAdminComponent,
  BanqueListAdminComponent,
  BanqueViewAdminComponent,
  BanqueEditAdminComponent,
  EtatAvancementCreateAdminComponent,
  EtatAvancementListAdminComponent,
  EtatAvancementViewAdminComponent,
  EtatAvancementEditAdminComponent,
  NationaliteCreateAdminComponent,
  NationaliteListAdminComponent,
  NationaliteViewAdminComponent,
  NationaliteEditAdminComponent,
  ],
})
export class CommunAdminModule { }
