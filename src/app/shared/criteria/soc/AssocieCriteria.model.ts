import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {SocieteCriteria} from './SocieteCriteria.model';
import {RoleAssocieCriteria} from './RoleAssocieCriteria.model';

export class AssocieCriteria  extends BaseCriteria  {

    public id: number;
    public nom: string;
    public nomLike: string;
  public societe: SocieteCriteria ;
  public societes: Array<SocieteCriteria> ;
  public roleAssocie: RoleAssocieCriteria ;
  public roleAssocies: Array<RoleAssocieCriteria> ;

}
