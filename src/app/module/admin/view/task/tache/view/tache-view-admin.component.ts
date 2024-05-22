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


import {TacheAdminService} from 'src/app/shared/service/admin/task/TacheAdmin.service';
import {TacheDto} from 'src/app/shared/model/task/Tache.model';
import {TacheCriteria} from 'src/app/shared/criteria/task/TacheCriteria.model';

import {DossierClientDto} from 'src/app/shared/model/dc/DossierClient.model';
import {DossierClientAdminService} from 'src/app/shared/service/admin/dc/DossierClientAdmin.service';
import {EntiteExterneDto} from 'src/app/shared/model/entite/EntiteExterne.model';
import {EntiteExterneAdminService} from 'src/app/shared/service/admin/entite/EntiteExterneAdmin.service';
import {TacheDetailDto} from 'src/app/shared/model/task/TacheDetail.model';
import {TacheDetailAdminService} from 'src/app/shared/service/admin/task/TacheDetailAdmin.service';
import {EtatAvancementDto} from 'src/app/shared/model/commun/EtatAvancement.model';
import {EtatAvancementAdminService} from 'src/app/shared/service/admin/commun/EtatAvancementAdmin.service';
import {PrioriteDto} from 'src/app/shared/model/commun/Priorite.model';
import {PrioriteAdminService} from 'src/app/shared/service/admin/commun/PrioriteAdmin.service';
import {UtilisateurDto} from 'src/app/shared/model/utilisateur/Utilisateur.model';
import {UtilisateurAdminService} from 'src/app/shared/service/admin/utilisateur/UtilisateurAdmin.service';
import {TacheEntiteExterneDto} from 'src/app/shared/model/task/TacheEntiteExterne.model';
import {TacheEntiteExterneAdminService} from 'src/app/shared/service/admin/task/TacheEntiteExterneAdmin.service';
@Component({
  selector: 'app-tache-view-admin',
  templateUrl: './tache-view-admin.component.html'
})
export class TacheViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    tacheDetails = new TacheDetailDto();
    tacheDetailss: Array<TacheDetailDto> = [];
    tacheEntiteExternes = new TacheEntiteExterneDto();
    tacheEntiteExterness: Array<TacheEntiteExterneDto> = [];

    constructor(private service: TacheAdminService, private dossierClientService: DossierClientAdminService, private entiteExterneService: EntiteExterneAdminService, private tacheDetailService: TacheDetailAdminService, private etatAvancementService: EtatAvancementAdminService, private prioriteService: PrioriteAdminService, private utilisateurService: UtilisateurAdminService, private tacheEntiteExterneService: TacheEntiteExterneAdminService){
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
    get priorite(): PrioriteDto {
        return this.prioriteService.item;
    }
    set priorite(value: PrioriteDto) {
        this.prioriteService.item = value;
    }
    get priorites(): Array<PrioriteDto> {
        return this.prioriteService.items;
    }
    set priorites(value: Array<PrioriteDto>) {
        this.prioriteService.items = value;
    }
    get entiteExterne(): EntiteExterneDto {
        return this.entiteExterneService.item;
    }
    set entiteExterne(value: EntiteExterneDto) {
        this.entiteExterneService.item = value;
    }
    get entiteExternes(): Array<EntiteExterneDto> {
        return this.entiteExterneService.items;
    }
    set entiteExternes(value: Array<EntiteExterneDto>) {
        this.entiteExterneService.items = value;
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
    get dossierClient(): DossierClientDto {
        return this.dossierClientService.item;
    }
    set dossierClient(value: DossierClientDto) {
        this.dossierClientService.item = value;
    }
    get dossierClients(): Array<DossierClientDto> {
        return this.dossierClientService.items;
    }
    set dossierClients(value: Array<DossierClientDto>) {
        this.dossierClientService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<TacheDto> {
        return this.service.items;
    }

    set items(value: Array<TacheDto>) {
        this.service.items = value;
    }

    get item(): TacheDto {
        return this.service.item;
    }

    set item(value: TacheDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TacheCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
