import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {TypeEntiteExterneCriteria} from './TypeEntiteExterneCriteria.model';

export class EntiteExterneCriteria  extends BaseCriteria  {

    public id: number;
    public nom: string;
    public nomLike: string;
    public email: string;
    public emailLike: string;
    public tel: string;
    public telLike: string;
  public typeEntiteExterne: TypeEntiteExterneCriteria ;
  public typeEntiteExternes: Array<TypeEntiteExterneCriteria> ;

}
