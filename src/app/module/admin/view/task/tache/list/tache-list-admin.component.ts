import {Component, OnInit} from '@angular/core';
import {TacheAdminService} from 'src/app/shared/service/admin/task/TacheAdmin.service';
import {TacheDto} from 'src/app/shared/model/task/Tache.model';
import {TacheCriteria} from 'src/app/shared/criteria/task/TacheCriteria.model';


import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
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

import {AuthService} from 'src/app/zynerator/security/shared/service/Auth.service';
import {ExportService} from 'src/app/zynerator/util/Export.service';


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
  selector: 'app-tache-list-admin',
  templateUrl: './tache-list-admin.component.html'
})
export class TacheListAdminComponent implements OnInit {

    protected fileName = 'Tache';

    protected findByCriteriaShow = false;
    protected cols: any[] = [];
    protected excelPdfButons: MenuItem[];
    protected exportData: any[] = [];
    protected criteriaData: any[] = [];
    protected _totalRecords = 0;
    private _pdfName: string;


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    protected authService: AuthService;
    protected exportService: ExportService;
    protected excelFile: File | undefined;
    protected enableSecurity = false;


    priorites: Array<PrioriteDto>;
    etatAvancements: Array<EtatAvancementDto>;
    dossierClients: Array<DossierClientDto>;


    constructor( private service: TacheAdminService  , private dossierClientService: DossierClientAdminService, private entiteExterneService: EntiteExterneAdminService, private tacheDetailService: TacheDetailAdminService, private etatAvancementService: EtatAvancementAdminService, private prioriteService: PrioriteAdminService, private utilisateurService: UtilisateurAdminService, private tacheEntiteExterneService: TacheEntiteExterneAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
        this.loadPriorite();
        this.loadEtatAvancement();
        this.loadDossierClient();

    }




    public onExcelFileSelected(event: any): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.excelFile = input.files[0];
        }
    }

    public importExcel(): void {
        if (this.excelFile) {
            this.service.importExcel(this.excelFile).subscribe(
                response => {
                    console.log('File uploaded successfully!', response);
                },
                error => {
                    console.error('Error uploading file:', error);
                }
            );
        }
    }

    public findPaginatedByCriteria() {
        this.service.findPaginatedByCriteria(this.criteria).subscribe(paginatedItems => {
            this.items = paginatedItems.list;
            this.totalRecords = paginatedItems.dataSize;
            this.selections = new Array<TacheDto>();
        }, error => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: TacheDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            console.log(res);
            this.editDialog = true;
        });

    }

    public async view(dto: TacheDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new TacheDto();
        this.createDialog = true;
    }

    public async deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultiple().subscribe(() => {
                    this.items = this.items.filter(item => !this.selections.includes(item));
                    this.selections = new Array<TacheDto>();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Les éléments sélectionnés ont été supprimés',
                        life: 3000
                    });

                }, error => console.log(error));
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }


    public async delete(dto: TacheDto) {

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(dto).subscribe(status => {
                    if (status > 0) {
                        const position = this.items.indexOf(dto);
                        position > -1 ? this.items.splice(position, 1) : false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Element Supprimé',
                            life: 3000
                        });
                    }

                }, error => console.log(error));
            }
        });

    }

    public async duplicate(dto: TacheDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            res => {
                this.initDuplicate(res);
                this.item = res;
                this.item.id = null;
                this.createDialog = true;
            });
    }

    // TODO : check if correct
    public initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    public exportPdf(dto: TacheDto): void {
        this.service.exportPdf(dto).subscribe((data: ArrayBuffer) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.pdfName;
            link.setAttribute('target', '_blank'); // open link in new tab
            link.click();
            window.URL.revokeObjectURL(url);
        }, (error) => {
            console.error(error); // handle any errors that occur
        });
    }

    public showSearch(): void {
        this.findByCriteriaShow = !this.findByCriteriaShow;
    }


    update() {
        this.service.edit().subscribe(data => {
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = data;
            this.editDialog = false;
            this.item = new TacheDto();
        } , error => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;


                this.item = new TacheDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }
        }, error => {
            console.log(error);
        });
    }

// add


    public initCol() {
        this.cols = [
            {field: 'dateLimite', header: 'Date limite'},
            {field: 'priorite?.code', header: 'Priorite'},
            {field: 'etatAvancement?.code', header: 'Etat avancement'},
            {field: 'dossierClient?.nom', header: 'Dossier client'},
        ];
    }


    public async loadPriorite(){
        this.prioriteService.findAllOptimized().subscribe(priorites => this.priorites = priorites, error => console.log(error))
    }
    public async loadEtatAvancement(){
        this.etatAvancementService.findAllOptimized().subscribe(etatAvancements => this.etatAvancements = etatAvancements, error => console.log(error))
    }
    public async loadDossierClient(){
        this.dossierClientService.findAllOptimized().subscribe(dossierClients => this.dossierClients = dossierClients, error => console.log(error))
    }


	public initDuplicate(res: TacheDto) {
        if (res.tacheDetails != null) {
             res.tacheDetails.forEach(d => { d.tache = null; d.id = null; });
        }
        if (res.tacheEntiteExternes != null) {
             res.tacheEntiteExternes.forEach(d => { d.tache = null; d.id = null; });
        }
	}



   public prepareColumnExport(): void {
        this.exportData = this.items.map(e => {
            return {
                 'Description': e.description ,
                'Date limite': this.datePipe.transform(e.dateLimite , 'dd/MM/yyyy hh:mm'),
                'Priorite': e.priorite?.code ,
                'Etat avancement': e.etatAvancement?.code ,
                'Dossier client': e.dossierClient?.nom ,
            }
        });

        this.criteriaData = [{
            'Description': this.criteria.description ? this.criteria.description : environment.emptyForExport ,
            'Date limite Min': this.criteria.dateLimiteFrom ? this.datePipe.transform(this.criteria.dateLimiteFrom , this.dateFormat) : environment.emptyForExport ,
            'Date limite Max': this.criteria.dateLimiteTo ? this.datePipe.transform(this.criteria.dateLimiteTo , this.dateFormat) : environment.emptyForExport ,
        //'Priorite': this.criteria.priorite?.code ? this.criteria.priorite?.code : environment.emptyForExport ,
        //'Etat avancement': this.criteria.etatAvancement?.code ? this.criteria.etatAvancement?.code : environment.emptyForExport ,
        //'Dossier client': this.criteria.dossierClient?.nom ? this.criteria.dossierClient?.nom : environment.emptyForExport ,
        }];
      }



    get items(): Array<TacheDto> {
        return this.service.items;
    }

    set items(value: Array<TacheDto>) {
        this.service.items = value;
    }

    get selections(): Array<TacheDto> {
        return this.service.selections;
    }

    set selections(value: Array<TacheDto>) {
        this.service.selections = value;
    }

    get item(): TacheDto {
        return this.service.item;
    }

    set item(value: TacheDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
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

    get dateFormat() {
        return environment.dateFormatList;
    }


    get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(value: number) {
        this._totalRecords = value;
    }

    get pdfName(): string {
        return this._pdfName;
    }

    set pdfName(value: string) {
        this._pdfName = value;
    }

    get createActionIsValid(): boolean {
        return this.service.createActionIsValid;
    }

    set createActionIsValid(value: boolean) {
        this.service.createActionIsValid = value;
    }


    get editActionIsValid(): boolean {
        return this.service.editActionIsValid;
    }

    set editActionIsValid(value: boolean) {
        this.service.editActionIsValid = value;
    }

    get listActionIsValid(): boolean {
        return this.service.listActionIsValid;
    }

    set listActionIsValid(value: boolean) {
        this.service.listActionIsValid = value;
    }

    get deleteActionIsValid(): boolean {
        return this.service.deleteActionIsValid;
    }

    set deleteActionIsValid(value: boolean) {
        this.service.deleteActionIsValid = value;
    }


    get viewActionIsValid(): boolean {
        return this.service.viewActionIsValid;
    }

    set viewActionIsValid(value: boolean) {
        this.service.viewActionIsValid = value;
    }

    get duplicateActionIsValid(): boolean {
        return this.service.duplicateActionIsValid;
    }

    set duplicateActionIsValid(value: boolean) {
        this.service.duplicateActionIsValid = value;
    }

    get createAction(): string {
        return this.service.createAction;
    }

    set createAction(value: string) {
        this.service.createAction = value;
    }

    get listAction(): string {
        return this.service.listAction;
    }

    set listAction(value: string) {
        this.service.listAction = value;
    }

    get editAction(): string {
        return this.service.editAction;
    }

    set editAction(value: string) {
        this.service.editAction = value;
    }

    get deleteAction(): string {
        return this.service.deleteAction;
    }

    set deleteAction(value: string) {
        this.service.deleteAction = value;
    }

    get viewAction(): string {
        return this.service.viewAction;
    }

    set viewAction(value: string) {
        this.service.viewAction = value;
    }

    get duplicateAction(): string {
        return this.service.duplicateAction;
    }

    set duplicateAction(value: string) {
        this.service.duplicateAction = value;
    }

    get entityName(): string {
        return this.service.entityName;
    }

    set entityName(value: string) {
        this.service.entityName = value;
    }
}
