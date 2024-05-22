import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {NationaliteCriteria} from '../commun/NationaliteCriteria.model';
import {TypeIdentiteCriteria} from '../commun/TypeIdentiteCriteria.model';
import {BanqueCriteria} from '../commun/BanqueCriteria.model';

export class DossierClientCriteria  extends BaseCriteria  {

    public id: number;
    public nom: string;
    public nomLike: string;
    public adresse: string;
    public adresseLike: string;
    public numeroIdentite: string;
    public numeroIdentiteLike: string;
    public raisonSociale: string;
    public raisonSocialeLike: string;
    public identifiantCommun: string;
    public identifiantCommunLike: string;
    public registreCommerce: string;
    public registreCommerceLike: string;
    public taxeProfessionnelle: string;
    public taxeProfessionnelleLike: string;
    public cnss: string;
    public cnssLike: string;
    public groupeSociete: string;
    public groupeSocieteLike: string;
  public typeIdentite: TypeIdentiteCriteria ;
  public typeIdentites: Array<TypeIdentiteCriteria> ;

}
