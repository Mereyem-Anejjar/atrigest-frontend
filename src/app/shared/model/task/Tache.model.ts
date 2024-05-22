import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {DossierClientDto} from '../dc/DossierClient.model';
import {TacheDetailDto} from './TacheDetail.model';
import {EtatAvancementDto} from '../commun/EtatAvancement.model';
import {PrioriteDto} from '../commun/Priorite.model';
import {TacheEntiteExterneDto} from './TacheEntiteExterne.model';

export class TacheDto extends BaseDto{

    public description: string;

   public dateLimite: Date;

    public priorite: PrioriteDto ;
    public etatAvancement: EtatAvancementDto ;
    public dossierClient: DossierClientDto ;
     public tacheDetails: Array<TacheDetailDto>;
     public tacheEntiteExternes: Array<TacheEntiteExterneDto>;
    

    constructor() {
        super();

        this.description = '';
        this.dateLimite = null;
        this.priorite = new PrioriteDto() ;
        this.etatAvancement = new EtatAvancementDto() ;
        this.dossierClient = new DossierClientDto() ;
        this.tacheDetails = new Array<TacheDetailDto>();
        this.tacheEntiteExternes = new Array<TacheEntiteExterneDto>();

        }

}
