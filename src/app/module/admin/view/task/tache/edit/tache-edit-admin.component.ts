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
  selector: 'app-tache-edit-admin',
  templateUrl: './tache-edit-admin.component.html'
})
export class TacheEditAdminComponent implements OnInit {

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


    private _tacheDetailsElement = new TacheDetailDto();
    private _tacheEntiteExternesElement = new TacheEntiteExterneDto();


    private _validPrioriteCode = true;
    private _validEtatAvancementCode = true;
    private _validDossierClientNom = true;


    private _tacheEntiteExternes: Array<TacheEntiteExterneDto> = [];

    constructor(private service: TacheAdminService , private dossierClientService: DossierClientAdminService, private entiteExterneService: EntiteExterneAdminService, private tacheDetailService: TacheDetailAdminService, private etatAvancementService: EtatAvancementAdminService, private prioriteService: PrioriteAdminService, private utilisateurService: UtilisateurAdminService, private tacheEntiteExterneService: TacheEntiteExterneAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.tacheDetailsElement.utilisateur = new UtilisateurDto();
        this.utilisateurService.findAll().subscribe((data) => this.utilisateurs = data);
        this.tacheDetailsElement.etatAvancement = new EtatAvancementDto();
        this.etatAvancementService.findAll().subscribe((data) => this.etatAvancements = data);

        this.entiteExterneService.findAll().subscribe(data => this.prepareTacheEntiteExternes(data));
        this.tacheEntiteExternesElement.entiteExterne = new EntiteExterneDto();
        this.entiteExterneService.findAll().subscribe((data) => this.entiteExternes = data);

        this.prioriteService.findAll().subscribe((data) => this.priorites = data);
        this.etatAvancementService.findAll().subscribe((data) => this.etatAvancements = data);
        this.dossierClientService.findAll().subscribe((data) => this.dossierClients = data);
    }

    public prepareEdit() {
        this.item.dateLimite = this.service.format(this.item.dateLimite);
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
            this.item = new TacheDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }




    prepareTacheEntiteExternes(entiteExternes: Array<EntiteExterneDto>): void{
        if( entiteExternes != null){
            entiteExternes.forEach(e => {
                const tacheEntiteExterne = new TacheEntiteExterneDto();
                tacheEntiteExterne.entiteExterne = e;
                this.tacheEntiteExternes.push(tacheEntiteExterne);
            });
        }
    }

    public validateTacheDetails(){
        this.errorMessages = new Array();
    }

    public setValidation(value: boolean){
    }

   public addTacheDetails() {
        if( this.item.tacheDetails == null )
            this.item.tacheDetails = new Array<TacheDetailDto>();
       this.validateTacheDetails();
       if (this.errorMessages.length === 0) {
            if(this.tacheDetailsElement.id == null){
                this.item.tacheDetails.push(this.tacheDetailsElement);
            }else{
                const index = this.item.tacheDetails.findIndex(e => e.id == this.tacheDetailsElement.id);
                this.item.tacheDetails[index] = this.tacheDetailsElement;
            }
          this.tacheDetailsElement = new TacheDetailDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteTacheDetails(p: TacheDetailDto) {
        this.item.tacheDetails.forEach((element, index) => {
            if (element === p) { this.item.tacheDetails.splice(index, 1); }
        });
    }

    public editTacheDetails(p: TacheDetailDto) {
        this.tacheDetailsElement = {... p};
        this.activeTab = 0;
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
    get createPrioriteDialog(): boolean {
        return this.prioriteService.createDialog;
    }
    set createPrioriteDialog(value: boolean) {
        this.prioriteService.createDialog= value;
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
    get createEntiteExterneDialog(): boolean {
        return this.entiteExterneService.createDialog;
    }
    set createEntiteExterneDialog(value: boolean) {
        this.entiteExterneService.createDialog= value;
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
    get createDossierClientDialog(): boolean {
        return this.dossierClientService.createDialog;
    }
    set createDossierClientDialog(value: boolean) {
        this.dossierClientService.createDialog= value;
    }

    get tacheEntiteExternes(): Array<TacheEntiteExterneDto> {
        if( this._tacheEntiteExternes == null )
            this._tacheEntiteExternes = new Array();
         return this._tacheEntiteExternes;
    }

    set tacheEntiteExternes(value: Array<TacheEntiteExterneDto>) {
        this._tacheEntiteExternes = value;
    }
    get tacheDetailsElement(): TacheDetailDto {
        if( this._tacheDetailsElement == null )
            this._tacheDetailsElement = new TacheDetailDto();
         return this._tacheDetailsElement;
    }

    set tacheDetailsElement(value: TacheDetailDto) {
        this._tacheDetailsElement = value;
    }
    get tacheEntiteExternesElement(): TacheEntiteExterneDto {
        if( this._tacheEntiteExternesElement == null )
            this._tacheEntiteExternesElement = new TacheEntiteExterneDto();
         return this._tacheEntiteExternesElement;
    }

    set tacheEntiteExternesElement(value: TacheEntiteExterneDto) {
        this._tacheEntiteExternesElement = value;
    }


    get validPrioriteCode(): boolean {
        return this._validPrioriteCode;
    }
    set validPrioriteCode(value: boolean) {
        this._validPrioriteCode = value;
    }
    get validEtatAvancementCode(): boolean {
        return this._validEtatAvancementCode;
    }
    set validEtatAvancementCode(value: boolean) {
        this._validEtatAvancementCode = value;
    }
    get validDossierClientNom(): boolean {
        return this._validDossierClientNom;
    }
    set validDossierClientNom(value: boolean) {
        this._validDossierClientNom = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): TacheCriteria {
        return this.service.criteria;
    }

    set criteria(value: TacheCriteria) {
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
