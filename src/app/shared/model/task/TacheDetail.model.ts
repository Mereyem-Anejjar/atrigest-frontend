import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {EtatAvancementDto} from '../commun/EtatAvancement.model';
import {UtilisateurDto} from '../utilisateur/Utilisateur.model';
import {TacheDto} from './Tache.model';

export class TacheDetailDto extends BaseDto{

    public description: string;

    public utilisateur: UtilisateurDto ;
    public etatAvancement: EtatAvancementDto ;
    public tache: TacheDto ;
    

    constructor() {
        super();

        this.description = '';
        this.utilisateur = new UtilisateurDto() ;
        this.etatAvancement = new EtatAvancementDto() ;

        }

}
