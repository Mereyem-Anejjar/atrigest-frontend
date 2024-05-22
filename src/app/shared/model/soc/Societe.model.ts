import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {TypeSocieteDto} from './TypeSociete.model';
import {AssocieDto} from './Associe.model';

export class SocieteDto extends BaseDto{

    public nom: string;

   public dateCreation: Date;

    public rc: string;

    public taxeProfessionnelle: string;

    public ice: string;

    public gerant: string;

    public type: TypeSocieteDto ;
     public associes: Array<AssocieDto>;
    

    constructor() {
        super();

        this.nom = '';
        this.dateCreation = null;
        this.rc = '';
        this.taxeProfessionnelle = '';
        this.ice = '';
        this.gerant = '';
        this.associes = new Array<AssocieDto>();

        }

}
