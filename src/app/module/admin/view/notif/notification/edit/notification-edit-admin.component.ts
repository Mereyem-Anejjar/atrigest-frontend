import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {NotificationAdminService} from 'src/app/shared/service/admin/notif/NotificationAdmin.service';
import {NotificationDto} from 'src/app/shared/model/notif/Notification.model';
import {NotificationCriteria} from 'src/app/shared/criteria/notif/NotificationCriteria.model';


import {NotificationDetailDto} from 'src/app/shared/model/notif/NotificationDetail.model';
import {NotificationDetailAdminService} from 'src/app/shared/service/admin/notif/NotificationDetailAdmin.service';
import {UtilisateurDto} from 'src/app/shared/model/utilisateur/Utilisateur.model';
import {UtilisateurAdminService} from 'src/app/shared/service/admin/utilisateur/UtilisateurAdmin.service';

@Component({
  selector: 'app-notification-edit-admin',
  templateUrl: './notification-edit-admin.component.html'
})
export class NotificationEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;


    private _notificationDetailsElement = new NotificationDetailDto();




    private _notificationDetails: Array<NotificationDetailDto> = [];

    constructor(private service: NotificationAdminService , private notificationDetailService: NotificationDetailAdminService, private utilisateurService: UtilisateurAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.utilisateurService.findAll().subscribe(data => this.prepareNotificationDetails(data));
        this.notificationDetailsElement.utilisateur = new UtilisateurDto();
        this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data);

    }

    public prepareEdit() {
        this.item.dateEnvoi = this.service.format(this.item.dateEnvoi);
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new NotificationDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }




    prepareNotificationDetails(utilisateurs: Array<UtilisateurDto>): void{
        if( utilisateurs != null){
            utilisateurs.forEach(e => {
                const notificationDetail = new NotificationDetailDto();
                notificationDetail.utilisateur = e;
                this.notificationDetails.push(notificationDetail);
            });
        }
    }

    public setValidation(value: boolean){
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }





    get utilisateur(): UtilisateurDto {
        return this.utilisateurService.item;
    }
    set utilisateur(value: UtilisateurDto) {
        this.utilisateurService.item = value;
    }
    get utilisateurs(): Array<UtilisateurDto> {
        return this.utilisateurService.items;
    }
    set utilisateurs(value: Array<UtilisateurDto>) {
        this.utilisateurService.items = value;
    }
    get createUtilisateurDialog(): boolean {
        return this.utilisateurService.createDialog;
    }
    set createUtilisateurDialog(value: boolean) {
        this.utilisateurService.createDialog= value;
    }

    get notificationDetails(): Array<NotificationDetailDto> {
        if( this._notificationDetails == null )
            this._notificationDetails = new Array();
         return this._notificationDetails;
    }

    set notificationDetails(value: Array<NotificationDetailDto>) {
        this._notificationDetails = value;
    }
    get notificationDetailsElement(): NotificationDetailDto {
        if( this._notificationDetailsElement == null )
            this._notificationDetailsElement = new NotificationDetailDto();
         return this._notificationDetailsElement;
    }

    set notificationDetailsElement(value: NotificationDetailDto) {
        this._notificationDetailsElement = value;
    }



	get items(): Array<NotificationDto> {
        return this.service.items;
    }

    set items(value: Array<NotificationDto>) {
        this.service.items = value;
    }

    get item(): NotificationDto {
        return this.service.item;
    }

    set item(value: NotificationDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): NotificationCriteria {
        return this.service.criteria;
    }

    set criteria(value: NotificationCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }


}
