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



import {EntiteExterneAdminService} from 'src/app/shared/service/admin/entite/EntiteExterneAdmin.service';
import {EntiteExterneDto} from 'src/app/shared/model/entite/EntiteExterne.model';
import {EntiteExterneCriteria} from 'src/app/shared/criteria/entite/EntiteExterneCriteria.model';
import {TypeEntiteExterneDto} from 'src/app/shared/model/entite/TypeEntiteExterne.model';
import {TypeEntiteExterneAdminService} from 'src/app/shared/service/admin/entite/TypeEntiteExterneAdmin.service';
@Component({
  selector: 'app-entite-externe-create-admin',
  templateUrl: './entite-externe-create-admin.component.html'
})
export class EntiteExterneCreateAdminComponent  implements OnInit {

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



   private _validEntiteExterneNom = true;
    private _validTypeEntiteExterneCode = true;

	constructor(private service: EntiteExterneAdminService , private typeEntiteExterneService: TypeEntiteExterneAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.typeEntiteExterneService.findAll().subscribe((data) => this.typeEntiteExternes = data);
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
                this.item = new EntiteExterneDto();
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
        this.validEntiteExterneNom = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateEntiteExterneNom();
    }

    public validateEntiteExterneNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
        this.errorMessages.push('Nom non valide');
        this.validEntiteExterneNom = false;
        } else {
            this.validEntiteExterneNom = true;
        }
    }


    public async openCreateTypeEntiteExterne(typeEntiteExterne: string) {
    const isPermistted = await this.roleService.isPermitted('TypeEntiteExterne', 'add');
    if(isPermistted) {
         this.typeEntiteExterne = new TypeEntiteExterneDto();
         this.createTypeEntiteExterneDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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
    get createTypeEntiteExterneDialog(): boolean {
        return this.typeEntiteExterneService.createDialog;
    }
    set createTypeEntiteExterneDialog(value: boolean) {
        this.typeEntiteExterneService.createDialog= value;
    }



    get validEntiteExterneNom(): boolean {
        return this._validEntiteExterneNom;
    }

    set validEntiteExterneNom(value: boolean) {
         this._validEntiteExterneNom = value;
    }

    get validTypeEntiteExterneCode(): boolean {
        return this._validTypeEntiteExterneCode;
    }
    set validTypeEntiteExterneCode(value: boolean) {
        this._validTypeEntiteExterneCode = value;
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

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): EntiteExterneCriteria {
        return this.service.criteria;
    }

    set criteria(value: EntiteExterneCriteria) {
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
