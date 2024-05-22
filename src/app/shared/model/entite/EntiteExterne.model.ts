import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {TypeEntiteExterneDto} from './TypeEntiteExterne.model';

export class EntiteExterneDto extends BaseDto{

    public nom: string;

    public email: string;

    public tel: string;

    public typeEntiteExterne: TypeEntiteExterneDto ;
    

    constructor() {
        super();

        this.nom = '';
        this.email = '';
        this.tel = '';
        this.typeEntiteExterne = new TypeEntiteExterneDto() ;

        }

}
