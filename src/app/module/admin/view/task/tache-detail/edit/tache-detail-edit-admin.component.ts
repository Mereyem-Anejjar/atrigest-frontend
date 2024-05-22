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
  selector: 'app-tache-detail-edit-admin',
  templateUrl: './tache-detail-edit-admin.component.html'
})
export class TacheDetailEditAdminComponent implements OnInit {

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




    private _validEtatAvancementCode = true;



    constructor(private service: TacheDetailAdminService , private etatAvancementService: EtatAvancementAdminService, private utilisateurService: UtilisateurAdminService, private tacheService: TacheAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data);
        this.etatAvancementService.findAll().subscribe((data) => this.etatAvancements = data);
        this.tacheService.findAll().subscribe((data) => this.taches = data);
    }

    public prepareEdit() {
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
            this.item = new TacheDetailDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }




   public async openCreateTache(tache: string) {
        const isPermistted = await this.roleService.isPermitted('Tache', 'edit');
        if (isPermistted) {
             this.tache = new TacheDto();
             this.createTacheDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createTacheDialog(): boolean {
        return this.tacheService.createDialog;
    }
    set createTacheDialog(value: boolean) {
        this.tacheService.createDialog= value;
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
    get createEtatAvancementDialog(): boolean {
        return this.etatAvancementService.createDialog;
    }
    set createEtatAvancementDialog(value: boolean) {
        this.etatAvancementService.createDialog= value;
    }



    get validEtatAvancementCode(): boolean {
        return this._validEtatAvancementCode;
    }
    set validEtatAvancementCode(value: boolean) {
        this._validEtatAvancementCode = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TacheDetailCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheDetailCriteria) {
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
