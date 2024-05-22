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



import {AssocieAdminService} from 'src/app/shared/service/admin/soc/AssocieAdmin.service';
import {AssocieDto} from 'src/app/shared/model/soc/Associe.model';
import {AssocieCriteria} from 'src/app/shared/criteria/soc/AssocieCriteria.model';
import {SocieteDto} from 'src/app/shared/model/soc/Societe.model';
import {SocieteAdminService} from 'src/app/shared/service/admin/soc/SocieteAdmin.service';
import {RoleAssocieDto} from 'src/app/shared/model/soc/RoleAssocie.model';
import {RoleAssocieAdminService} from 'src/app/shared/service/admin/soc/RoleAssocieAdmin.service';
@Component({
  selector: 'app-associe-create-admin',
  templateUrl: './associe-create-admin.component.html'
})
export class AssocieCreateAdminComponent  implements OnInit {

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



   private _validAssocieNom = true;
    private _validSocieteNom = true;
    private _validRoleAssocieCode = true;

	constructor(private service: AssocieAdminService , private societeService: SocieteAdminService, private roleAssocieService: RoleAssocieAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.societeService.findAll().subscribe((data) => this.societes = data);
        this.roleAssocieService.findAll().subscribe((data) => this.roleAssocies = data);
    }


    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new AssocieDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }





    public  setValidation(value: boolean){
        this.validAssocieNom = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateAssocieNom();
    }

    public validateAssocieNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
        this.errorMessages.push('Nom non valide');
        this.validAssocieNom = false;
        } else {
            this.validAssocieNom = true;
        }
    }


    public async openCreateSociete(societe: string) {
    const isPermistted = await this.roleService.isPermitted('Societe', 'add');
    if(isPermistted) {
         this.societe = new SocieteDto();
         this.createSocieteDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }
    public async openCreateRoleAssocie(roleAssocie: string) {
    const isPermistted = await this.roleService.isPermitted('RoleAssocie', 'add');
    if(isPermistted) {
         this.roleAssocie = new RoleAssocieDto();
         this.createRoleAssocieDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get societe(): SocieteDto {
        return this.societeService.item;
    }
    set societe(value: SocieteDto) {
        this.societeService.item = value;
    }
    get societes(): Array<SocieteDto> {
        return this.societeService.items;
    }
    set societes(value: Array<SocieteDto>) {
        this.societeService.items = value;
    }
    get createSocieteDialog(): boolean {
        return this.societeService.createDialog;
    }
    set createSocieteDialog(value: boolean) {
        this.societeService.createDialog= value;
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
    get createRoleAssocieDialog(): boolean {
        return this.roleAssocieService.createDialog;
    }
    set createRoleAssocieDialog(value: boolean) {
        this.roleAssocieService.createDialog= value;
    }



    get validAssocieNom(): boolean {
        return this._validAssocieNom;
    }

    set validAssocieNom(value: boolean) {
         this._validAssocieNom = value;
    }

    get validSocieteNom(): boolean {
        return this._validSocieteNom;
    }
    set validSocieteNom(value: boolean) {
        this._validSocieteNom = value;
    }
    get validRoleAssocieCode(): boolean {
        return this._validRoleAssocieCode;
    }
    set validRoleAssocieCode(value: boolean) {
        this._validRoleAssocieCode = value;
    }


    get items(): Array<AssocieDto> {
        return this.service.items;
    }

    set items(value: Array<AssocieDto>) {
        this.service.items = value;
    }

    get item(): AssocieDto {
        return this.service.item;
    }

    set item(value: AssocieDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): AssocieCriteria {
        return this.service.criteria;
    }

    set criteria(value: AssocieCriteria) {
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
