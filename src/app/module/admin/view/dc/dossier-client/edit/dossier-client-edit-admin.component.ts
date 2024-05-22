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
  selector: 'app-dossier-client-edit-admin',
  templateUrl: './dossier-client-edit-admin.component.html'
})
export class DossierClientEditAdminComponent implements OnInit {

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



    private _validDossierClientNom = true;

    private _validNationaliteCode = true;
    private _validTypeIdentiteCode = true;
    private _validBanqueAdherenteCode = true;



    constructor(private service: DossierClientAdminService , private nationaliteService: NationaliteAdminService, private typeIdentiteService: TypeIdentiteAdminService, private banqueService: BanqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.nationaliteService.findAll().subscribe((data) => this.nationalites = data);
        this.typeIdentiteService.findAll().subscribe((data) => this.typeIdentites = data);
        this.banqueService.findAll().subscribe((data) => this.banqueAdherentes = data);
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
            this.item = new DossierClientDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validDossierClientNom = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateDossierClientNom();
    }

    public validateDossierClientNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validDossierClientNom = false;
        } else {
            this.validDossierClientNom = true;
        }
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
    get createNationaliteDialog(): boolean {
        return this.nationaliteService.createDialog;
    }
    set createNationaliteDialog(value: boolean) {
        this.nationaliteService.createDialog= value;
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
    get createBanqueAdherenteDialog(): boolean {
        return this.banqueService.createDialog;
    }
    set createBanqueAdherenteDialog(value: boolean) {
        this.banqueService.createDialog= value;
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
    get createTypeIdentiteDialog(): boolean {
        return this.typeIdentiteService.createDialog;
    }
    set createTypeIdentiteDialog(value: boolean) {
        this.typeIdentiteService.createDialog= value;
    }


    get validDossierClientNom(): boolean {
        return this._validDossierClientNom;
    }
    set validDossierClientNom(value: boolean) {
        this._validDossierClientNom = value;
    }

    get validNationaliteCode(): boolean {
        return this._validNationaliteCode;
    }
    set validNationaliteCode(value: boolean) {
        this._validNationaliteCode = value;
    }
    get validTypeIdentiteCode(): boolean {
        return this._validTypeIdentiteCode;
    }
    set validTypeIdentiteCode(value: boolean) {
        this._validTypeIdentiteCode = value;
    }
    get validBanqueAdherenteCode(): boolean {
        return this._validBanqueAdherenteCode;
    }
    set validBanqueAdherenteCode(value: boolean) {
        this._validBanqueAdherenteCode = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): DossierClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierClientCriteria) {
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
