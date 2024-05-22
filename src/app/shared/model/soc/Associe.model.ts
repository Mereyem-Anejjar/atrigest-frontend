import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {SocieteDto} from './Societe.model';
import {RoleAssocieDto} from './RoleAssocie.model';

export class AssocieDto extends BaseDto{

    public nom: string;

    public societe: SocieteDto ;
    public roleAssocie: RoleAssocieDto ;
    

    constructor() {
        super();

        this.nom = '';
        this.societe = new SocieteDto() ;
        this.roleAssocie = new RoleAssocieDto() ;

        }

}
