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


import {DossierClientAdminService} from 'src/app/shared/service/admin/dc/DossierClientAdmin.service';
import {DossierClientDto} from 'src/app/shared/model/dc/DossierClient.model';
import {DossierClientCriteria} from 'src/app/shared/criteria/dc/DossierClientCriteria.model';

import {NationaliteDto} from 'src/app/shared/model/commun/Nationalite.model';
import {NationaliteAdminService} from 'src/app/shared/service/admin/commun/NationaliteAdmin.service';
import {TypeIdentiteDto} from 'src/app/shared/model/commun/TypeIdentite.model';
import {TypeIdentiteAdminService} from 'src/app/shared/service/admin/commun/TypeIdentiteAdmin.service';
import {BanqueDto} from 'src/app/shared/model/commun/Banque.model';
import {BanqueAdminService} from 'src/app/shared/service/admin/commun/BanqueAdmin.service';
@Component({
  selector: 'app-dossier-client-view-admin',
  templateUrl: './dossier-client-view-admin.component.html'
})
export class DossierClientViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: DossierClientAdminService, private nationaliteService: NationaliteAdminService, private typeIdentiteService: TypeIdentiteAdminService, private banqueService: BanqueAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get nationalite(): NationaliteDto {
        return this.nationaliteService.item;
    }
    set nationalite(value: NationaliteDto) {
        this.nationaliteService.item = value;
    }
    get nationalites(): Array<NationaliteDto> {
        return this.nationaliteService.items;
    }
    set nationalites(value: Array<NationaliteDto>) {
        this.nationaliteService.items = value;
    }
    get banqueAdherente(): BanqueDto {
        return this.banqueService.item;
    }
    set banqueAdherente(value: BanqueDto) {
        this.banqueService.item = value;
    }
    get banqueAdherentes(): Array<BanqueDto> {
        return this.banqueService.items;
    }
    set banqueAdherentes(value: Array<BanqueDto>) {
        this.banqueService.items = value;
    }
    get typeIdentite(): TypeIdentiteDto {
        return this.typeIdentiteService.item;
    }
    set typeIdentite(value: TypeIdentiteDto) {
        this.typeIdentiteService.item = value;
    }
    get typeIdentites(): Array<TypeIdentiteDto> {
        return this.typeIdentiteService.items;
    }
    set typeIdentites(value: Array<TypeIdentiteDto>) {
        this.typeIdentiteService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<DossierClientDto> {
        return this.service.items;
    }

    set items(value: Array<DossierClientDto>) {
        this.service.items = value;
    }

    get item(): DossierClientDto {
        return this.service.item;
    }

    set item(value: DossierClientDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): DossierClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierClientCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
