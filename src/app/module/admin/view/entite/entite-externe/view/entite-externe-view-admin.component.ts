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


import {EntiteExterneAdminService} from 'src/app/shared/service/admin/entite/EntiteExterneAdmin.service';
import {EntiteExterneDto} from 'src/app/shared/model/entite/EntiteExterne.model';
import {EntiteExterneCriteria} from 'src/app/shared/criteria/entite/EntiteExterneCriteria.model';

import {TypeEntiteExterneDto} from 'src/app/shared/model/entite/TypeEntiteExterne.model';
import {TypeEntiteExterneAdminService} from 'src/app/shared/service/admin/entite/TypeEntiteExterneAdmin.service';
@Component({
  selector: 'app-entite-externe-view-admin',
  templateUrl: './entite-externe-view-admin.component.html'
})
export class EntiteExterneViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: EntiteExterneAdminService, private typeEntiteExterneService: TypeEntiteExterneAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get typeEntiteExterne(): TypeEntiteExterneDto {
        return this.typeEntiteExterneService.item;
    }
    set typeEntiteExterne(value: TypeEntiteExterneDto) {
        this.typeEntiteExterneService.item = value;
    }
    get typeEntiteExternes(): Array<TypeEntiteExterneDto> {
        return this.typeEntiteExterneService.items;
    }
    set typeEntiteExternes(value: Array<TypeEntiteExterneDto>) {
        this.typeEntiteExterneService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<EntiteExterneDto> {
        return this.service.items;
    }

    set items(value: Array<EntiteExterneDto>) {
        this.service.items = value;
    }

    get item(): EntiteExterneDto {
        return this.service.item;
    }

    set item(value: EntiteExterneDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): EntiteExterneCriteria {
        return this.service.criteria;
    }

    set criteria(value: EntiteExterneCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
