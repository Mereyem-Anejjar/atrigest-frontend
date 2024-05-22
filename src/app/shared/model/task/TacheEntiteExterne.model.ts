import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {EntiteExterneDto} from '../entite/EntiteExterne.model';
import {TacheDto} from './Tache.model';

export class TacheEntiteExterneDto extends BaseDto{

    public entiteExterne: EntiteExterneDto ;
    public tache: TacheDto ;
    

    constructor() {
        super();


        }

}
