import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {NationaliteDto} from '../commun/Nationalite.model';
import {TypeIdentiteDto} from '../commun/TypeIdentite.model';
import {BanqueDto} from '../commun/Banque.model';

export class DossierClientDto extends BaseDto{

    public nom: string;

    public adresse: string;

    public numeroIdentite: string;

    public raisonSociale: string;

    public identifiantCommun: string;

    public registreCommerce: string;

    public taxeProfessionnelle: string;

    public cnss: string;

    public groupeSociete: string;

    public nationalite: NationaliteDto ;
    public typeIdentite: TypeIdentiteDto ;
    public banqueAdherente: BanqueDto ;
    

    constructor() {
        super();

        this.nom = '';
        this.adresse = '';
        this.numeroIdentite = '';
        this.raisonSociale = '';
        this.identifiantCommun = '';
        this.registreCommerce = '';
        this.taxeProfessionnelle = '';
        this.cnss = '';
        this.groupeSociete = '';
        this.typeIdentite = new TypeIdentiteDto() ;

        }

}
