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
  selector: 'app-societe-edit-admin',
  templateUrl: './societe-edit-admin.component.html'
})
export class SocieteEditAdminComponent implements OnInit {

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


    private _associesElement = new AssocieDto();

    private _validSocieteNom = true;

    private _validTypeCode = true;
    private _validAssociesNom = true;



    constructor(private service: SocieteAdminService , private typeSocieteService: TypeSocieteAdminService, private roleAssocieService: RoleAssocieAdminService, private associeService: AssocieAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.associesElement.roleAssocie = new RoleAssocieDto();
        this.roleAssocieService.findAll().subscribe((data) => this.roleAssocies = data);

        this.typeSocieteService.findAll().subscribe((data) => this.types = data);
    }

    public prepareEdit() {
        this.item.dateCreation = this.service.format(this.item.dateCreation);
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
            this.item = new SocieteDto();
        } , error =>{
            console.log(error);
        });
    }



    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateAssocies(){
        this.errorMessages = new Array();
        this.validateAssociesNom();
    }

    public setValidation(value: boolean){
        this.validSocieteNom = value;
        this.validAssociesNom = value;
    }

   public addAssocies() {
        if( this.item.associes == null )
            this.item.associes = new Array<AssocieDto>();
       this.validateAssocies();
       if (this.errorMessages.length === 0) {
            if(this.associesElement.id == null){
                this.item.associes.push(this.associesElement);
            }else{
                const index = this.item.associes.findIndex(e => e.id == this.associesElement.id);
                this.item.associes[index] = this.associesElement;
            }
          this.associesElement = new AssocieDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteAssocies(p: AssocieDto) {
        this.item.associes.forEach((element, index) => {
            if (element === p) { this.item.associes.splice(index, 1); }
        });
    }

    public editAssocies(p: AssocieDto) {
        this.associesElement = {... p};
        this.activeTab = 0;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateSocieteNom();
    }

    public validateSocieteNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validSocieteNom = false;
        } else {
            this.validSocieteNom = true;
        }
    }



    private validateAssociesNom(){
        if (this.associesElement.nom == null) {
        this.errorMessages.push('Nom de la associe est  invalide');
            this.validAssociesNom = false;
        } else {
            this.validAssociesNom = true;
        }
    }

   public async openCreateType(type: string) {
        const isPermistted = await this.roleService.isPermitted('TypeSociete', 'edit');
        if (isPermistted) {
             this.type = new TypeSocieteDto();
             this.createTypeDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
   public async openCreateRoleAssocie(roleAssocie: string) {
        const isPermistted = await this.roleService.isPermitted('RoleAssocie', 'edit');
        if (isPermistted) {
             this.roleAssocie = new RoleAssocieDto();
             this.createRoleAssocieDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createTypeDialog(): boolean {
        return this.typeSocieteService.createDialog;
    }
    set createTypeDialog(value: boolean) {
        this.typeSocieteService.createDialog= value;
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

    get associesElement(): AssocieDto {
        if( this._associesElement == null )
            this._associesElement = new AssocieDto();
         return this._associesElement;
    }

    set associesElement(value: AssocieDto) {
        this._associesElement = value;
    }

    get validSocieteNom(): boolean {
        return this._validSocieteNom;
    }
    set validSocieteNom(value: boolean) {
        this._validSocieteNom = value;
    }

    get validTypeCode(): boolean {
        return this._validTypeCode;
    }
    set validTypeCode(value: boolean) {
        this._validTypeCode = value;
    }
    get validAssociesNom(): boolean {
        return this._validAssociesNom;
    }
    set validAssociesNom(value: boolean) {
        this._validAssociesNom = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): SocieteCriteria {
        return this.service.criteria;
    }

    set criteria(value: SocieteCriteria) {
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
