import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {DossierClientCriteria} from '../dc/DossierClientCriteria.model';
import {TacheDetailCriteria} from './TacheDetailCriteria.model';
import {EtatAvancementCriteria} from '../commun/EtatAvancementCriteria.model';
import {PrioriteCriteria} from '../commun/PrioriteCriteria.model';
import {TacheEntiteExterneCriteria} from './TacheEntiteExterneCriteria.model';

export class TacheCriteria  extends BaseCriteria  {

    public id: number;
    public description: string;
    public descriptionLike: string;
    public dateLimite: Date;
    public dateLimiteFrom: Date;
    public dateLimiteTo: Date;
  public priorite: PrioriteCriteria ;
  public priorites: Array<PrioriteCriteria> ;
  public etatAvancement: EtatAvancementCriteria ;
  public etatAvancements: Array<EtatAvancementCriteria> ;
  public dossierClient: DossierClientCriteria ;
  public dossierClients: Array<DossierClientCriteria> ;
      public tacheDetails: Array<TacheDetailCriteria>;
      public tacheEntiteExternes: Array<TacheEntiteExterneCriteria>;

}
