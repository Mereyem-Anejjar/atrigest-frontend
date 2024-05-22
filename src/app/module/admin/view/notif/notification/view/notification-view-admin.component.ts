import {Component, OnInit} from '@angular/core';


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
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


import {NotificationAdminService} from 'src/app/shared/service/admin/notif/NotificationAdmin.service';
import {NotificationDto} from 'src/app/shared/model/notif/Notification.model';
import {NotificationCriteria} from 'src/app/shared/criteria/notif/NotificationCriteria.model';

import {NotificationDetailDto} from 'src/app/shared/model/notif/NotificationDetail.model';
import {NotificationDetailAdminService} from 'src/app/shared/service/admin/notif/NotificationDetailAdmin.service';
import {UtilisateurDto} from 'src/app/shared/model/utilisateur/Utilisateur.model';
import {UtilisateurAdminService} from 'src/app/shared/service/admin/utilisateur/UtilisateurAdmin.service';
@Component({
  selector: 'app-notification-view-admin',
  templateUrl: './notification-view-admin.component.html'
})
export class NotificationViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    notificationDetails = new NotificationDetailDto();
    notificationDetailss: Array<NotificationDetailDto> = [];

    constructor(private service: NotificationAdminService, private notificationDetailService: NotificationDetailAdminService, private utilisateurService: UtilisateurAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): NotificationCriteria {
        return this.service.criteria;
    }

    set criteria(value: NotificationCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
