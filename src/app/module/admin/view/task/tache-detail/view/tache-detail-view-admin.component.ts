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


import {TacheDetailAdminService} from 'src/app/shared/service/admin/task/TacheDetailAdmin.service';
import {TacheDetailDto} from 'src/app/shared/model/task/TacheDetail.model';
import {TacheDetailCriteria} from 'src/app/shared/criteria/task/TacheDetailCriteria.model';

import {EtatAvancementDto} from 'src/app/shared/model/commun/EtatAvancement.model';
import {EtatAvancementAdminService} from 'src/app/shared/service/admin/commun/EtatAvancementAdmin.service';
import {UtilisateurDto} from 'src/app/shared/model/utilisateur/Utilisateur.model';
import {UtilisateurAdminService} from 'src/app/shared/service/admin/utilisateur/UtilisateurAdmin.service';
import {TacheDto} from 'src/app/shared/model/task/Tache.model';
import {TacheAdminService} from 'src/app/shared/service/admin/task/TacheAdmin.service';
@Component({
  selector: 'app-tache-detail-view-admin',
  templateUrl: './tache-detail-view-admin.component.html'
})
export class TacheDetailViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: TacheDetailAdminService, private etatAvancementService: EtatAvancementAdminService, private utilisateurService: UtilisateurAdminService, private tacheService: TacheAdminService){
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
    get tache(): TacheDto {
        return this.tacheService.item;
    }
    set tache(value: TacheDto) {
        this.tacheService.item = value;
    }
    get taches(): Array<TacheDto> {
        return this.tacheService.items;
    }
    set taches(value: Array<TacheDto>) {
        this.tacheService.items = value;
    }
    get etatAvancement(): EtatAvancementDto {
        return this.etatAvancementService.item;
    }
    set etatAvancement(value: EtatAvancementDto) {
        this.etatAvancementService.item = value;
    }
    get etatAvancements(): Array<EtatAvancementDto> {
        return this.etatAvancementService.items;
    }
    set etatAvancements(value: Array<EtatAvancementDto>) {
        this.etatAvancementService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<TacheDetailDto> {
        return this.service.items;
    }

    set items(value: Array<TacheDetailDto>) {
        this.service.items = value;
    }

    get item(): TacheDetailDto {
        return this.service.item;
    }

    set item(value: TacheDetailDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TacheDetailCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheDetailCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
