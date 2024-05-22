import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {EtatAvancementCriteria} from '../commun/EtatAvancementCriteria.model';
import {UtilisateurCriteria} from '../utilisateur/UtilisateurCriteria.model';
import {TacheCriteria} from './TacheCriteria.model';

export class TacheDetailCriteria  extends BaseCriteria  {

    public id: number;
    public description: string;
    public descriptionLike: string;
  public utilisateur: UtilisateurCriteria ;
  public utilisateurs: Array<UtilisateurCriteria> ;
  public etatAvancement: EtatAvancementCriteria ;
  public etatAvancements: Array<EtatAvancementCriteria> ;

}
