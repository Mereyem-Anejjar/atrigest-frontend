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


import {SocieteAdminService} from 'src/app/shared/service/admin/soc/SocieteAdmin.service';
import {SocieteDto} from 'src/app/shared/model/soc/Societe.model';
import {SocieteCriteria} from 'src/app/shared/criteria/soc/SocieteCriteria.model';

import {TypeSocieteDto} from 'src/app/shared/model/soc/TypeSociete.model';
import {TypeSocieteAdminService} from 'src/app/shared/service/admin/soc/TypeSocieteAdmin.service';
import {RoleAssocieDto} from 'src/app/shared/model/soc/RoleAssocie.model';
import {RoleAssocieAdminService} from 'src/app/shared/service/admin/soc/RoleAssocieAdmin.service';
import {AssocieDto} from 'src/app/shared/model/soc/Associe.model';
import {AssocieAdminService} from 'src/app/shared/service/admin/soc/AssocieAdmin.service';
@Component({
  selector: 'app-societe-view-admin',
  templateUrl: './societe-view-admin.component.html'
})
export class SocieteViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    associes = new AssocieDto();
    associess: Array<AssocieDto> = [];

    constructor(private service: SocieteAdminService, private typeSocieteService: TypeSocieteAdminService, private roleAssocieService: RoleAssocieAdminService, private associeService: AssocieAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get type(): TypeSocieteDto {
        return this.typeSocieteService.item;
    }
    set type(value: TypeSocieteDto) {
        this.typeSocieteService.item = value;
    }
    get types(): Array<TypeSocieteDto> {
        return this.typeSocieteService.items;
    }
    set types(value: Array<TypeSocieteDto>) {
        this.typeSocieteService.items = value;
    }
    get roleAssocie(): RoleAssocieDto {
        return this.roleAssocieService.item;
    }
    set roleAssocie(value: RoleAssocieDto) {
        this.roleAssocieService.item = value;
    }
    get roleAssocies(): Array<RoleAssocieDto> {
        return this.roleAssocieService.items;
    }
    set roleAssocies(value: Array<RoleAssocieDto>) {
        this.roleAssocieService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<SocieteDto> {
        return this.service.items;
    }

    set items(value: Array<SocieteDto>) {
        this.service.items = value;
    }

    get item(): SocieteDto {
        return this.service.item;
    }

    set item(value: SocieteDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): SocieteCriteria {
        return this.service.criteria;
    }

    set criteria(value: SocieteCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
